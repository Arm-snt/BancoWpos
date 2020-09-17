<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TipoTransaccion
 *
 * @ORM\Table(name="tipo_transaccion")
 * @ORM\Entity
 */
class TipoTransaccion
{
    /**
     * @var int
     *
     * @ORM\Column(name="codigo_tipo_t", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $codigoTipoT;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_transaccion", type="string", length=20, nullable=false)
     */
    private $nombreTransaccion;

    /**
     * @var string
     *
     * @ORM\Column(name="detalles", type="string", length=50, nullable=false)
     */
    private $detalles;

    public function getCodigoTipoT(): ?int
    {
        return $this->codigoTipoT;
    }

    public function getNombreTransaccion(): ?string
    {
        return $this->nombreTransaccion;
    }

    public function setNombreTransaccion(string $nombreTransaccion): self
    {
        $this->nombreTransaccion = $nombreTransaccion;

        return $this;
    }

    public function getDetalles(): ?string
    {
        return $this->detalles;
    }

    public function setDetalles(string $detalles): self
    {
        $this->detalles = $detalles;

        return $this;
    }


}
