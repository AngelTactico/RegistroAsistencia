export class Usuario {
  public correo = '';
  public password = '';
  public nombre = '';
  public preguntaSecreta = '';
  public respuestaSecreta = '';
  public admin = '';

  constructor(
    correo: string,
    password: string,
    nombre: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    admin: string)
  {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.admin = admin;
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('dramirez@duocuc.cl', '1234', 'Daniel Ramirez'
      , '¿Cuál fue tu primera mascota?', 'perro','N'));
    lista.push(new Usuario('crodriguez@duocuc.cl', '4321', 'Carlos Rodriguez'
      , '¿Quien es tu mejor amigo?', 'tomas','Y'));
    lista.push(new Usuario('cvalenzuela@duocuc.cl', '1810', 'Catalina Valenzuela'
      , '¿Cual es tu color favorito?', 'morado','x'));      
    return lista;
  }

  public buscarUsuarioValido(correo: string, password: string): Usuario {
    return this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.password === password);
  }

public buscarUsuarioValidoRecu(correo: string): Usuario {
  return this.listaUsuariosValidos().find(
    usu => usu.correo === correo);
}

}
