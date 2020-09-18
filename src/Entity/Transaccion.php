<?php

namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Transaccion
 *
 * @ORM\Table(name="transaccion", indexes={@ORM\Index(name="numero_cuenta", columns={"numero_cuenta"}), @ORM\Index(name="codigo_tipo_t", columns={"codigo_tipo_t"})})
 * @ORM\Entity
 */
class Transaccion
{
    /**
     * @var int
     *
     * @ORM\Column(name="codigo_transaccion", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $codigo_transaccion;

    /**
     * @var int|null
     *
     * @ORM\Column(name="numero_cuenta_d", type="bigint", nullable=true, options={"default"="NULL"})
     */
    private $numero_cuenta_d = 'NULL';

    /**
     * @var float
     *
     * @ORM\Column(name="monto", type="float", precision=10, scale=0, nullable=false)
     */
    private $monto;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha_transaccion", type="date", nullable=false)
     */
    private $fecha_transaccion;

    /**
     * @var \TipoTransaccion
     *
     * @ORM\ManyToOne(targetEntity="TipoTransaccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="codigo_tipo_t", referencedColumnName="codigo_tipo_t")
     * })
     */
    private $codigo_tipo_t;

    /**
     * @var \Cuenta
     *
     * @ORM\ManyToOne(targetEntity="Cuenta")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="numero_cuenta", referencedColumnName="numero_cuenta")
     * })
     */
    private $numero_cuenta;

    public function getCodigoTransaccion(): ?string
    {
        return $this->codigo_transaccion;
    }

    public function getNumeroCuentaD(): ?string
    {
        return $this->numero_cuenta_d;
    }

    public function setNumeroCuentaD(?string $numero_cuenta_d): self
    {
        $this->numero_cuenta_d = $numero_cuenta_d;

        return $this;
    }

    public function getMonto(): ?float
    {
        return $this->monto;
    }

    public function setMonto(float $monto): self
    {
        $this->monto = $monto;

        return $this;
    }

    public function getFechaTransaccion(): ?\DateTimeInterface
    {
        return $this->fecha_transaccion;
    }

    public function setFechaTransaccion(\DateTimeInterface $fechaTransaccion): self
    {
        $this->fecha_transaccion = $fecha_transaccion;

        return $this;
    }

    public function getCodigoTipoT(): ?TipoTransaccion
    {
        return $this->codigo_tipo_t;
    }

    public function setCodigoTipoT(?TipoTransaccion $codigoTipoT): self
    {
        $this->codigo_tipo_t = $codigo_tipo_t;

        return $this;
    }

    public function getNumeroCuenta(): ?Cuenta
    {
        return $this->numeroCuenta;
    }

    public function setNumeroCuenta(?Cuenta $numero_cuenta): self
    {
        $this->numero_cuenta = $numero_cuenta;

        return $this;
    }


}
