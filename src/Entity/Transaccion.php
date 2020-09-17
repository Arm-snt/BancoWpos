<?php

namespace App\Entity;

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
    private $codigoTransaccion;

    /**
     * @var int|null
     *
     * @ORM\Column(name="numero_cuenta_d", type="bigint", nullable=true, options={"default"="NULL"})
     */
    private $numeroCuentaD = 'NULL';

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
    private $fechaTransaccion;

    /**
     * @var \TipoTransaccion
     *
     * @ORM\ManyToOne(targetEntity="TipoTransaccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="codigo_tipo_t", referencedColumnName="codigo_tipo_t")
     * })
     */
    private $codigoTipoT;

    /**
     * @var \Cuenta
     *
     * @ORM\ManyToOne(targetEntity="Cuenta")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="numero_cuenta", referencedColumnName="numero_cuenta")
     * })
     */
    private $numeroCuenta;

    public function getCodigoTransaccion(): ?string
    {
        return $this->codigoTransaccion;
    }

    public function getNumeroCuentaD(): ?string
    {
        return $this->numeroCuentaD;
    }

    public function setNumeroCuentaD(?string $numeroCuentaD): self
    {
        $this->numeroCuentaD = $numeroCuentaD;

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
        return $this->fechaTransaccion;
    }

    public function setFechaTransaccion(\DateTimeInterface $fechaTransaccion): self
    {
        $this->fechaTransaccion = $fechaTransaccion;

        return $this;
    }

    public function getCodigoTipoT(): ?TipoTransaccion
    {
        return $this->codigoTipoT;
    }

    public function setCodigoTipoT(?TipoTransaccion $codigoTipoT): self
    {
        $this->codigoTipoT = $codigoTipoT;

        return $this;
    }

    public function getNumeroCuenta(): ?Cuenta
    {
        return $this->numeroCuenta;
    }

    public function setNumeroCuenta(?Cuenta $numeroCuenta): self
    {
        $this->numeroCuenta = $numeroCuenta;

        return $this;
    }


}
