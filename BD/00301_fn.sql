/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

CREATE OR REPLACE FUNCTION store.fn_b_anuncios(p_dato dtexto) RETURNS SETOF store.anuncios AS $$
    SELECT id, pers_id, id_tipo_empleo, id_tipo_anuncio, ci, facebook, celular, direccion, coordenadas, imagenes, anuncio, calificacion,fecha_limite, estado, usuario, editado
      FROM store.anuncios
    WHERE upper(anuncio) like upper('%'||$1||'%')::dtexto;
$$ LANGUAGE SQL stable;
COMMENT ON FUNCTION store.fn_b_anuncios(p_dato dtexto) is 'Buscando anuncios.....';
SELECT * FROM store.fn_b_anuncios('a');



  --- asignando rol para anuncios
  INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
  (3,(SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),'2050-01-01','{}','rpmamani');
  
-- modificando funcion para asignar rol de anuncios de emplead


/** Aut: renepastor@gmail.com AGO2017
*  Modificar contrasenia del usuario logueado
*   **/
create or replace function store.create_user_anuncios(
  p_alias dtexto2,
  p_cuenta dtexto2,
  p_clave dtexto2,
  p_avatar djson
) returns text as $$
declare
  v_pers_id dllave:=1;
  usuarios store.usuarios;
  --current_setting('jwt.claims.pers_id')::integer
begin
  INSERT INTO store.usuarios(alias, cuenta, clave, avatar, usuario) VALUES
  (p_alias, p_cuenta, crypt(p_clave, gen_salt('bf')), p_avatar, p_cuenta)
   returning * into usuarios;
  
  INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
  (usuarios.pers_id, 4 --(SELECT id FROM store.roles WHERE nombre='ANUNCIOS')
  ,'2050-01-01','{}',p_cuenta);
  --- asignando rol para anuncios
  if found then
    return 'ok';
  end if;
  return 'Por favor verifique los datos';
end;
$$ language plpgsql;

comment on function store.create_user_anuncios(dtexto2,dtexto2,dtexto2, djson)
is 'Crear usuario con rol anuncios';


commit;
