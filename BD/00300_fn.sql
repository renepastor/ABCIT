/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

CREATE or replace FUNCTION store.mi_usuario() RETURNS store.usuarios AS $$
  SELECT *
  FROM store.usuarios
  WHERE pers_id = current_setting('jwt.claims.pers_id')::dllave
  AND estado != 'X'
$$ language sql stable;
comment on function store.mi_usuario() is 'Buscando Usuario en session';


/** Aut: renepastor@gmail.com AGO2017
*  Autenticacion del usuario
*   **/
create or replace function store.auth(
  p_usuario text,
  p_clave text
) returns store.jwt as $$
declare
  users store.usuarios;
begin
  select a.* into users
  from store.usuarios as a
  where a.cuenta = $1
  AND a.estado != 'X';

  if users.clave = crypt(p_clave, users.clave) then
    return ('root', users.pers_id, users.cuenta)::store.jwt;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
comment on function store.auth(text, text) is 'Autenticacion de usuario por el nombre de usuario y la clave encriptada';



CREATE OR REPLACE FUNCTION store.fn_tipo_nombre(integer) RETURNS text
-- id tbl_tipos
AS $$
  SELECT nombre
    FROM store.tbl_tipos
    WHERE id = $1;
$$ LANGUAGE sql;



CREATE OR REPLACE FUNCTION store.fn_tipo_nombre_id(text) RETURNS bigint
-- nombre 
AS $$
  SELECT id
    FROM store.tbl_tipos
    WHERE nombre = $1;
$$
    LANGUAGE sql;


/*
CREATE OR REPLACE FUNCTION store.new_consultas() returns TRIGGER AS $$
DECLARE
  medico store.usuarios;
  v_id_usuario integer;
  v_id_tp_estado dllave = 4; -- posiblea infectado
  v_count integer;
  v_es_infectado integer = 0;
BEGIN

    SELECT t.mayor, t.pers_id INTO v_count, v_id_usuario
    FROM (SELECT COUNT(*) mayor, u.pers_id
      FROM store.usuarios u 
      INNER JOIN store.usr_roles ur ON (u.pers_id = ur.user_id)
      LEFT JOIN store.consultas c ON (u.pers_id = c.id_user_designado AND c.id_tp_estado = v_id_tp_estado)
      WHERE 'C' in (u.estado, c.estado)
        AND ur.rol_id = 2 --rol consulta
      GROUP BY u.pers_id
    ) t
    ORDER BY t.mayor LIMIT 1;

  v_es_infectado := NEW.edad_minima + NEW.llego_del_extranjero + NEW.contacto_con_infectado + NEW.con_fiebre + NEW.con_tos + NEW.con_flema + NEW.con_vomito + NEW.con_debilidad + NEW.con_disnea;
  NEW.ip := v_es_infectado;
  IF v_es_infectado > 8 THEN
    NEW.id_user_designado := v_id_usuario;
    NEW.id_tp_estado := v_id_tp_estado;
  ELSE
    NEW.id_user_designado := 1;
    NEW.id_tp_estado := 3; --no cumple
  END IF;

  NEW.editado := now();
  NEW.estado := 'C';
  return NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION store.new_consultas()
is 'trigger de designacion';


create trigger new_consultas before insert on store.consultas
  for each row execute procedure store.new_consultas();


CREATE or replace FUNCTION store.fn_b_consultas(p_dato dtexto) RETURNS SETOF store.consultas AS $$
    SELECT *
    FROM store.consultas
    WHERE upper(nombres) like upper('%'||$1||'%')
    OR upper(apellidos) like upper('%'||$1||'%')
    OR ci like '%'||$1||'%'
    AND estado ='C'
    AND id_user_designado = current_setting('jwt.claims.pers_id')::dllave;
$$ language sql stable;
comment on function store.fn_b_consultas(p_dato dtexto) is 'Buscando consultas segun un texto';
--select  * from store.fn_b_consultas('h');
*/


CREATE OR REPLACE FUNCTION store.fn_b_ingresos(p_dato dtexto) RETURNS SETOF store.ingresos AS $$
    SELECT i.id, i.id_unidad_medida, i.id_moneda, i.id_almacen, i.id_rubro, i.nombre, i.descripcion, i.imagenes, i.cantidad,
           i.cantidad_existente, i.cantidad_min, i.p_unitario, i.p_venta, i.estado, i.registrado, i.usuario, i.editado
    FROM store.ingresos i
    WHERE upper(i.descripcion) like upper('%'||$1||'%')::dtexto
    OR upper(i.nombre) like upper('%'||$1||'%');
$$ LANGUAGE SQL stable;
COMMENT ON FUNCTION store.fn_b_ingresos(p_dato dtexto) is 'Buscando productos e ingresos.....';
SELECT * FROM store.fn_b_ingresos('a');

commit;
