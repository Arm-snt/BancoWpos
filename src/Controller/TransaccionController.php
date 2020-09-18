<?php

namespace App\Controller;
use App\Entity\Transaccion;
use App\Repository\TransaccionRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/transaccion", name="api_transaccion")
 */

class TransaccionController extends AbstractController
{
    private $entityManager;
    private $transaccionRepository;

    public function __construct(EntityManagerInterface $entityManager, TransaccionRepository $transaccionRepository)
    {
        $this->entityManager = $entityManager;
        $this->transaccionRepository = $transaccionRepository;
    }

     /**
     * @Route("/read", name="api_transaccion_read", methods={"GET"})
     */
    public function read()
    {
        $transaccion = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
        $transaccion = $this->transaccionRepository->Mostrar();
        return $this->json($transaccion);
    }

    /**
     * @Route("/readCliente", name="api_transaccion_readCliente", methods={"GET"})
     */
    public function readCliente()
    {
        $cliente = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
        $cliente = $this->transaccionRepository->MostrarCliente();
        return $this->json($cliente);
    }

    /**
     * @Route("/create", name="api_transaccion_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */

    public function create(Request $request) {

        $content = json_decode($request->getContent(), true);
        $codigo_transaccion =$content['codigo_transaccion'];
        $numero_cuenta =$content['numero_cuenta'];
        $numero_cuenta_d=$content['numero_cuenta_d'];
        $monto=$content['monto'];
        $fecha_transaccion=$content['fecha_transaccion'];
        $codigo_tipo_t =$content['codigo_tipo_t'];


        try {
            
            $transaccion = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
            $transaccion = $this->transaccionRepository->Insertar($codigo_transaccion, $numero_cuenta, $numero_cuenta_d, $monto, $fecha_transaccion, $codigo_tipo_t);
            $transaccion = $this->transaccionRepository->BuscarTransaccion($codigo_transaccion);
            $cuenta = $this->transaccionRepository->BuscarCuenta($numero_cuenta);
            $saldo = $cuenta['saldo'];
            if($codigo_tipo_t==10){
                $nuevo_saldo = $saldo + $monto;
            }else if($codigo_tipo_t==20){
                $nuevo_saldo = $saldo - $monto;
            }else if($codigo_tipo_t==30){
                $nuevo_saldo = $saldo + $monto;
                $numero_cuenta = $numero_cuenta_d;
            }
            $Actualizar = $this->transaccionRepository->ActualizarCuenta($numero_cuenta, $nuevo_saldo);
            $cliente = $this->transaccionRepository->MostrarCliente();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El usuario no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'transaccion'=>$transaccion,
                'cliente'=>$cliente,
                'message' => ['text'=>['se ha realizado la transaccion exitosamente!'.$codigo_tipo_t ] , 'level'=>'success']      
                 ]);
    }

    /**
     * @Route("/createCliente", name="api_transaccion_createCliente", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */

    public function createCliente(Request $request) {

        $content = json_decode($request->getContent(), true);
        $documento =$content['documento'];
        $nombre_cliente =$content['nombre_cliente'];
        $apellido_cliente =$content['apellido_cliente'];
        $telefono =$content['telefono'];
        $sexo =$content['sexo'];
        $direccion =$content['direccion'];
        $numero_cuenta =$content['numero_cuenta'];
        $estado =$content['estado'];
        $fecha_creacion =$content['fecha_creacion'];
        $codigo_acceso =$content['codigo_acceso'];
        $correo =$content['correo'];
        $password =$content['password'];            


        try {
            
            $transaccion = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
            $existe = $this->transaccionRepository->BuscarCliente($documento);
            if($existe['total']==0){
                $transaccion = $this->transaccionRepository->InsertarCliente($documento, $nombre_cliente, $apellido_cliente, $telefono, $sexo, $direccion);
                $transaccion = $this->transaccionRepository->InsertarCuenta($numero_cuenta,$documento,$estado,$fecha_creacion);
                $transaccion = $this->transaccionRepository->GenerarAcceso($codigo_acceso,$documento,$correo,$password);
                $mensaje = 'Se ha registrado al Sr(a)'.$nombre_cliente.' de manera exitosa';
                $level='success';
            }else{
                $mensaje = 'El Cliente ya se encuentra registrado';
                $level='error';
            }

                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El usuario no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'transaccion'=>$transaccion,
                'message' => ['text'=>[$mensaje] , 'level'=>$level]      
                 ]);
    }
    
}
