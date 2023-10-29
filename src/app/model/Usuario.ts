import { supabase } from '../supabase.service'; // Importa tu configuración de Supabase

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
    admin: string
  ) {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.admin = admin;
  }

  public async obtenerUsuariosDesdeSupabase(): Promise<Usuario[]> {
    // Realiza una consulta a Supabase para obtener los usuarios
    const { data, error } = await supabase
      .from('Persona')
      .select('*');

    if (error) {
      // Manejar el error, como mostrar un mensaje o realizar alguna acción
      console.error('Error al obtener usuarios desde Supabase:', error);
      return [];
    }

    if (data) {
      // Mapear los datos de Supabase a objetos Usuario y devolverlos
      return data.map((user: any) => new Usuario(
        user.correo,
        user.password,
        user.nombre,
        user.preguntaSecreta,
        user.respuestaSecreta,
        user.admin
      ));
    }

    return [];
  }


  public async buscarUsuarioValido(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios = await this.obtenerUsuariosDesdeSupabase();
    return usuarios.find(usu => usu.correo === correo && usu.password === password);
  }

  public async buscarUsuarioValidoRecu(correo: string): Promise<Usuario | undefined> {
    const usuarios = await this.obtenerUsuariosDesdeSupabase();
    return usuarios.find(usu => usu.correo === correo);
  }

}

