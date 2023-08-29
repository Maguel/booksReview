<?php
class Resegna {
  private string $_titulo;
  private string $_rese;
  private int $_puntuacion;
  private string $_autor;
  private int $_id;
  public function __construct(string $_titulo, string $_rese, int $_puntuacion, string $_autor, int $_id){
    $this->_titulo=$_titulo;
    $this->_rese=$_rese;
    $this->_puntuacion=$_puntuacion;
    $this->_autor=$_autor;
    $this->_id=$_id;
  }
  public function getTitulo():string{
    return $this->_titulo;
  }
  public function getResegna():string{
    return $this->_rese;
  }
  public function getPuntuacion():int{
    return $this->_puntuacion;
  }
  public function getAutor():string{
    return $this->_autor;
  }
  public function getId():int{
    return $this->_id;
  }
}
?>