<?php

namespace App\Repository;

use App\Entity\Transaccion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Transaccion|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaccion|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaccion[]    findAll()
 * @method Transaccion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransaccionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registro)
    {
        parent::__construct($registro, Transaccion::class);
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