import { Injectable } from '@angular/core';
import { supabase } from '../supabase.service'; // Importa tu configuración de Supabase


@Injectable({
  providedIn: 'root'
})

export class Usuario {
  public Nombre = '';
  public Correo = '';
  public Contrasenna = '';
  public Pregunta = '';
  public Respuesta = '';
  public Presente = '';
  public Cargo = '';

  constructor(
    Nombre: string,
    Correo: string,
    Contrasenna: string,
    Pregunta: string,
    Respuesta: string,
    Presente: string,
    Cargo: string
  ) {
    this.Nombre = Nombre;
    this.Correo = Correo;
    this.Contrasenna = Contrasenna;
    this.Pregunta = Pregunta;
    this.Respuesta = Respuesta;
    this.Presente = Presente;
    this.Cargo = Cargo;
  
  }

  public async obtenerUsuariosDesdeSupabase(): Promise<Usuario[]> {
    // Realiza una consulta a Supabase para obtener los usuarios
    const { data, error } = await supabase
      .from('Testing')
      .select('*');

    if (error) {
      // Manejar el error, como mostrar un mensaje o realizar alguna acción
      console.error('Error al obtener usuarios desde Supabase:', error);
      return [];
    }

    if (data) {
      // Mapear los datos de Supabase a objetos Usuario y devolverlos
      return data.map((user: any) => new Usuario(
        user.Nombre,
        user.Correo,
        user.Contrasenna,
        user.Pregunta,
        user.Respuesta,
        user.Presente,
        user.Cargo
      ));
    }

    return [];
  }



  public async buscarUsuarioValido(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios = await this.obtenerUsuariosDesdeSupabase();
    
    console.log('Usuarios obtenidos desde Supabase:', usuarios);
  
    const usuarioEncontrado = usuarios.find(usu => usu.Correo === correo && usu.Contrasenna === password);
    if (usuarioEncontrado) {
      console.log('Usuario válido encontrado:', usuarioEncontrado);
    } else {
      console.log('No se encontró un usuario válido para las credenciales proporcionadas.');
    }
  
    return usuarioEncontrado;
    return usuarios.find(usu => usu.Correo === correo && usu.Contrasenna === password);
  }

  public async buscarUsuarioValidoRecu(correo: string): Promise<Usuario | undefined> {
    const usuarios = await this.obtenerUsuariosDesdeSupabase();
    return usuarios.find(usu => usu.Correo === correo);
  }




  
}


