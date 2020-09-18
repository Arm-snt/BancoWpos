<?php

namespace App\Repository;

use App\Entity\Transaccion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Transaccion|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaccion|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaccion[]    findAll()
 * @method Transaccion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransaccionRepository extends ServiceEntityRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transaccion::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.codigo_transaccion, tra.numero_cuenta, tra.numero_cuenta_d, tra.monto, tra.fecha_transaccion, tra.codigo_tipo_t, tip.nombre_transaccion, cli.nombre_cliente, cli.apellido_cliente 
            FROM transaccion tra, tipo_transaccion tip, cliente cli, cuenta cue 
            WHERE cli.documento=1065824141 AND tra.numero_cuenta=cue.numero_cuenta AND cue.documento_cliente = cli.documento AND tra.codigo_tipo_t=tip.codigo_tipo_t GROUP BY tra.codigo_transaccion ORDER BY tra.fecha_transaccion DESC");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($codigo_transaccion, $numero_cuenta, $numero_cuenta_d, $monto, $fecha_transaccion, $codigo_tipo_t){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO transaccion (codigo_transaccion, numero_cuenta, numero_cuenta_d, monto, fecha_transaccion, codigo_tipo_t) values (:cod, :numc, :numcd, :monto, :fecha, :codtt) ");
            if($stm->execute(array(':cod'=>$codigo_transaccion, ':numc'=>$numero_cuenta, ':numcd'=>$numero_cuenta_d, ':monto'=>$monto, ':fecha'=>$fecha_transaccion, ':codtt'=>$codigo_tipo_t)));;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarTransaccion($codigo_transaccion){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.codigo_transaccion, tra.numero_cuenta, tra.numero_cuenta_d, tra.monto, tra.fecha_transaccion, tra.codigo_tipo_t, tip.nombre_transaccion, cli.nombre_cliente, cli.apellido_cliente 
            FROM transaccion tra, tipo_transaccion tip, cliente cli, cuenta cue 
            WHERE cli.documento='1065824141' AND tra.codigo_transaccion=:cod AND tra.numero_cuenta=cue.numero_cuenta AND cue.documento_cliente = cli.documento AND tra.codigo_tipo_t=tip.codigo_tipo_t GROUP BY tra.codigo_transaccion ORDER BY tra.fecha_transaccion DESC");
            if($stm->execute(array(':cod'=>$codigo_transaccion)));
            $res = $stm->fetch();
            return $res;
        }catch(Exception $e) {
            return $e;
        }
            
    }

    public function BuscarCuenta($numero_cuenta){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare("SELECT cu.numero_cuenta, cu.documento_cliente, cu.saldo, cu.estado, cu.fecha_creacion 
            FROM cuenta cu
            WHERE cu.numero_cuenta=:num ");            
            if($stm->execute(array(':num'=>$numero_cuenta)));
            $res = $stm->fetch();
            return $res;
        }catch(Exception $e) {
            return $e;
        }
            
    }

    public function ActualizarCuenta($numero_cuenta, $nuevo_saldo){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE cuenta SET saldo=:saldo WHERE numero_cuenta =:num");
            if($stm->execute(array(':num' =>$numero_cuenta, ':saldo' =>$nuevo_saldo)));
        } catch (Exception $e) {
            return $e;
        }
    }
    
    public function BuscarCliente($documento){
        try{
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare("SELECT COUNT(*) total 
            FROM cliente 
            WHERE documento=:doc ");            
            if($stm->execute(array(':doc'=>$documento)));
            $res = $stm->fetch();
            return $res;
        }catch(Exception $e) {
            return $e;
        }
            
    }

    public function InsertarCliente($documento, $nombre_cliente, $apellido_cliente, $telefono, $sexo, $direccion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO cliente (documento, nombre_cliente, apellido_cliente, telefono, sexo, direccion) values (:doc, :nom, :apell, :tel, :sexo, :direccion) ");
            if($stm->execute(array(':doc'=>$documento, ':nom'=>$nombre_cliente, ':apell'=>$apellido_cliente, ':tel'=>$telefono, ':sexo'=>$sexo, ':direccion'=>$direccion)));;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function InsertarCuenta($numero_cuenta,$documento,$estado,$fecha_creacion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO cuenta (numero_cuenta, documento_cliente, estado, saldo, fecha_creacion) values (:num, :doc, :est, '1000000', :fec) ");
            if($stm->execute(array(':num'=>$numero_cuenta, ':doc'=>$documento, ':est'=>$estado, ':fec'=>$fecha_creacion)));;
        } catch (Exception $e) {
            return $e;
        }
    }

    function MostrarCliente(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare("SELECT cli.documento, cli.nombre_cliente, cli.apellido_cliente, cli.telefono, cli.sexo, cli.direccion, cu.numero_cuenta, cu.saldo, cu.estado, cu.fecha_creacion 
            FROM cuenta cu, cliente cli
            WHERE cli.documento='1065824141' AND cli.documento=cu.documento_cliente");            
            $stm->execute([]);
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function GenerarAcceso($codigo_acceso,$documento,$correo,$password){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO acceso (codigo_acceso, documento_cliente, correo, password) values (:cod, :doc, :corr, :pass) ");
            if($stm->execute(array(':cod'=>$codigo_acceso, ':doc'=>$documento, ':corr'=>$correo, ':pass'=>$password)));;
        } catch (Exception $e) {
            return $e;
        }
    }

    // /**
    //  * @return Transaccion[] Returns an array of Transaccion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transaccion
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

}