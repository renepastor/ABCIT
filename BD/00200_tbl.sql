/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;


create table store.tbl_tipos (
  id bigserial primary key,
  padre_id dllave,
--  codigo dtexto,
  nombre dtexto,
  valor dtexto,
  descripcion dtexto,
  ayuda dtexto,
  validador dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table store.parametros (
  id bigserial primary key,
  campo dtexto,
  valor dtexto,
  sistema dtexto2,
  descripcion dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);


create table store.usuarios (
  pers_id bigserial primary key,
  cuenta dtexto2 unique,
  clave dtexto2,
  alias dtexto2,
  avatar dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table store.enlaces (
  id bigserial primary key,
  padre_id dllave,
  orden dentero2 default 1,
  nivel dentero2 default 1,
  nombre dtexto,
  ruta dtexto,
  imagen dtexto2,
  ayuda dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table store.roles (
  id bigserial primary key,
  nombre dtexto,
  sistema dtexto,
  descripcion dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table store.usr_roles (
  id bigserial primary key,
  user_id dllave,
  rol_id dllave,
  expira dfecha2,
  permiso djson,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table store.menues (
  id bigserial primary key,
  rol_id dllave,
  enla_id dllave,
  estado destado,
  usuario duser,
  editado dfechahora
);


create type store.jwt as (
  role dtexto,
  pers_id dllave,
  cuenta dtexto
);


create table store.unidades_medida (
  id bigserial primary key,
  abreviatura dtexto,
  unidad dtexto,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);


create table store.rubros (
  id bigserial primary key,
  id_padre dllave2,
  codigo dtexto,
  rubro dtexto,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);

create table store.almacenes (
  id bigserial primary key,
  id_administrador dllave,
  nombre dtexto,
  direccion dtexto,
  coordenadas djson,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);

create table store.user_almacenes (
  id bigserial primary key,
  id_persona dllave,
  id_almacen dllave,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);

create table store.ingresos (
  id bigserial primary key,
  id_unidad_medida dllave,
  id_moneda dllave,
  id_almacen dllave,
  id_rubro dllave,
  nombre dtexto,
  descripcion dtexto2,
  imagenes djson default '[]',
  cantidad dmoneda,
  cantidad_existente dmoneda,
  cantidad_min dmoneda,
  p_unitario dmoneda3,
  p_venta dmoneda3,
  fecha_limite dfecha2,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);

create table store.egresos (
  id bigserial primary key,
  id_ingreso dllave,
  id_comprador dllave,
  id_entregador dllave,
  cantidad dmoneda,
  p_unitario dmoneda3,
  fecha_solicitud dfechahora,
  fecha_entrega dfechahora,
  descripcion_entrega dtexto,
  estado destado,
  registrado dfechahora,
  usuario duser,
  editado dfechahora
);




commit;
