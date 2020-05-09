
/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/


begin;

alter table only store.enlaces add foreign key (padre_id) references store.enlaces(id);
alter table only store.tbl_tipos add foreign key (padre_id) references store.tbl_tipos(id);
--alter table only store.usr_roles add foreign key (user_id) references store.personas(id);
alter table only store.usr_roles add foreign key (user_id) references store.usuarios(pers_id);
alter table only store.usr_roles add foreign key (rol_id) references store.roles(id);
alter table only store.menues add foreign key (rol_id) references store.roles(id);
alter table only store.menues add foreign key (enla_id) references store.enlaces(id);

alter table only store.rubros add foreign key (id_padre) references store.rubros(id);
alter table only store.almacenes add foreign key (id_administrador) references store.usuarios(pers_id);
alter table only store.user_almacenes add foreign key (id_persona) references store.usuarios(pers_id);
alter table only store.user_almacenes add foreign key (id_almacen) references store.almacenes(id);
alter table only store.ingresos add foreign key (id_moneda) references store.tbl_tipos(id);
alter table only store.ingresos add foreign key (id_almacen) references store.almacenes(id);
alter table only store.ingresos add foreign key (id_rubro) references store.rubros(id);
alter table only store.ingresos add foreign key (id_unidad_medida) references store.unidades_medida(id);
alter table only store.egresos add foreign key (id_ingreso) references store.ingresos(id);
alter table only store.egresos add foreign key (id_comprador) references store.usuarios(pers_id);
alter table only store.egresos add foreign key (id_entregador) references store.usuarios(pers_id);




commit;



