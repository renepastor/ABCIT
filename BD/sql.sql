/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
drop table store.datos_personales cascade;
commit;

begin;
create table store.anuncios (
  pers_id dllave primary key,
  id_tipo_empleo dllave,
  id_tipo_anuncio dllave,
  ci dtexto,
  facebook dtexto2,
  celular dtexto,
  direccion dtexto,
  coordenadas djson default '[]',
  especialidad dtexto,
  calificacion dentero4,
  estado destado,
  usuario duser,
  editado dfechahora
);



alter table only store.anuncios add foreign key (pers_id) references store.usuarios(pers_id);
alter table only store.anuncios add foreign key (id_tipo_empleo) references store.tbl_tipos(id);
alter table only store.anuncios add foreign key (id_tipo_anuncio) references store.tbl_tipos(id);


delete from store.tbl_tipos where padre_id in (select id from store.tbl_tipos where nombre = 'TP-PROF-OFI');
delete from store.tbl_tipos where nombre = 'TP-PROF-OFI';

delete from store.tbl_tipos where padre_id in (select id from store.tbl_tipos where nombre = 'TP-PROF-OFI');
delete from store.tbl_tipos where nombre = 'TP-PROF-OFI';

INSERT INTO store.tbl_tipos(padre_id,nombre,valor, descripcion,ayuda,validador,usuario) VALUES
(1,'TP-PROF-OFI','TIPO DE PROFECION Y OFICIOS','TIPO DE PROFECION Y OFICIOS','','',1);
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(store.fn_tipo_nombre_id('TP-PROF-OFI'),'LABANDERA','LABANDERA','LABANDERA','','',1),
(store.fn_tipo_nombre_id('TP-PROF-OFI'),'ALBAÑIL','ALBAÑIL','ALBAÑIL','','',1),
(store.fn_tipo_nombre_id('TP-PROF-OFI'),'AMA DE CASA','AMA DE CASA','AMA DE CASA','','',1),
(store.fn_tipo_nombre_id('TP-PROF-OFI'),'PINTOR','PINTOR','PINTOR','','',1),
(store.fn_tipo_nombre_id('TP-PROF-OFI'),'ELECTRICISTA','ELECTRICISTA','ELECTRICISTA','','',1);

INSERT INTO store.tbl_tipos(padre_id,nombre,valor, descripcion,ayuda,validador,usuario) VALUES
(1,'TP-ANUNCIO','TIPO ANUNCIO','TIPO ANUNCIO','','',1);
(store.fn_tipo_nombre_id('TP-ANUNCIO'),'OFERTA','OFERTA','BRINDAR SERVICIO','','',1),
(store.fn_tipo_nombre_id('TP-ANUNCIO'),'DEMANDA','REQUIERE SERVICIO','','','',1);

/*
--ALTER TABLE store.tbl_tipos ADD COLUMN avatar dtexto2;

-------******ROLES******--
--SELECT setval('store.roles_id_seq', 1);
insert into store.roles (sistema, nombre, descripcion,usuario) values 
('ANUNCIOS', 'ANUNCIOS', 'ANUNCIOS',1);

-------******ENLACES******--
--SELECT setval('store.enlaces_id_seq', 1);
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1,1,2,'MIS ANUNCIOS','fa-id-card', 'javascript:void(0)', '','rpmamani');
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM store.enlaces WHERE nombre='MIS ANUNCIOS'),2,20,'Admin. Publicacion','fa-v-card', '#/adminOfertaEmpleo', '','rpmamani');

-------******MENUS******--
insert into store.menues (rol_id, enla_id,usuario) values
((SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),(SELECT id FROM store.enlaces WHERE nombre='MIS ANUNCIOS'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),(SELECT id FROM store.enlaces WHERE nombre='Admin. Ofertas'),'rpmamani');



insert into store.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(3, 'daparicio', 'DALI APARICIO', crypt('12345', gen_salt('bf')), 'rpmamani');
INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(3,(SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),'2050-01-01','{}','rpmamani');
*/

commit;
