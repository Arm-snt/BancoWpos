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
    private $usuarioRepository;

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
    
}
