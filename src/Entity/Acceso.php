<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Acceso
 *
 * @ORM\Table(name="acceso", indexes={@ORM\Index(name="documento_cliente", columns={"documento_cliente"})})
 * @ORM\Entity
 */
class Acceso
{
    /**
     * @var int
     *
     * @ORM\Column(name="codigo_acceso", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $codigoAcceso;

    /**
     * @var string
     *
     * @ORM\Column(name="correo", type="string", length=50, nullable=false)
     */
    private $correo;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=200, nullable=false)
     */
    private $password;

    /**
     * @var \Cliente
     *
     * @ORM\ManyToOne(targetEntity="Cliente")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="documento_cliente", referencedColumnName="documento")
     * })
     */
    private $documentoCliente;

    public function getCodigoAcceso(): ?int
    {
        return $this->codigoAcceso;
    }

    public function getCorreo(): ?string
    {
        return $this->correo;
    }

    public function setCorreo(string $correo): self
    {
        $this->correo = $correo;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getDocumentoCliente(): ?Cliente
    {
        return $this->documentoCliente;
    }

    public function setDocumentoCliente(?Cliente $documentoCliente): self
    {
        $this->documentoCliente = $documentoCliente;

        return $this;
    }


}
