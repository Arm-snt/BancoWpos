<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Cliente
 *
 * @ORM\Table(name="cliente")
 * @ORM\Entity
 */
class Cliente
{
    /**
     * @var string
     *
     * @ORM\Column(name="documento", type="string", length=15, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $documento;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre_cliente", type="string", length=30, nullable=false)
     */
    private $nombreCliente;

    /**
     * @var string
     *
     * @ORM\Column(name="apellido_cliente", type="string", length=30, nullable=false)
     */
    private $apellidoCliente;

    /**
     * @var string|null
     *
     * @ORM\Column(name="telefono", type="string", length=12, nullable=true, options={"default"="NULL"})
     */
    private $telefono = 'NULL';

    /**
     * @var string
     *
     * @ORM\Column(name="sexo", type="string", length=10, nullable=false)
     */
    private $sexo;

    /**
     * @var string|null
     *
     * @ORM\Column(name="direccion", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $direccion = 'NULL';

    public function getDocumento(): ?string
    {
        return $this->documento;
    }

    public function getNombreCliente(): ?string
    {
        return $this->nombreCliente;
    }

    public function setNombreCliente(string $nombreCliente): self
    {
        $this->nombreCliente = $nombreCliente;

        return $this;
    }

    public function getApellidoCliente(): ?string
    {
        return $this->apellidoCliente;
    }

    public function setApellidoCliente(string $apellidoCliente): self
    {
        $this->apellidoCliente = $apellidoCliente;

        return $this;
    }

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(?string $telefono): self
    {
        $this->telefono = $telefono;

        return $this;
    }

    public function getSexo(): ?string
    {
        return $this->sexo;
    }

    public function setSexo(string $sexo): self
    {
        $this->sexo = $sexo;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(?string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }


}
