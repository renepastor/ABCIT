/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
/*
drop table store.anuncios cascade;
commit;

begin;

create table store.anuncios (
  id bigserial primary key,
  pers_id dllave,
  id_tipo_empleo dllave,
  id_tipo_anuncio dllave,
  ci dtexto,
  facebook dtexto2,
  celular dtexto,
  direccion dtexto,
  coordenadas djson default '[]',
  imagenes djson default '[]',
  anuncio dtexto,
  calificacion dentero4,
  estado destado,
  usuario duser,
  editado dfechahora
);



alter table only store.anuncios add foreign key (pers_id) references store.usuarios(pers_id);
alter table only store.anuncios add foreign key (id_tipo_empleo) references store.tbl_tipos(id);
alter table only store.anuncios add foreign key (id_tipo_anuncio) references store.tbl_tipos(id);


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
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(store.fn_tipo_nombre_id('TP-ANUNCIO'),'OFERTA','OFERTA','BRINDAR SERVICIO','','',1),
(store.fn_tipo_nombre_id('TP-ANUNCIO'),'DEMANDA','DEMANDA','REQUIERE SERVICIO','','',1);


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
((SELECT id FROM store.enlaces WHERE nombre='MIS ANUNCIOS'),2,20,'Admin. Anuncios','fa-v-card', '#/adminAnuncios', '','rpmamani');

-------******MENUS******--
insert into store.menues (rol_id, enla_id,usuario) values
((SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),(SELECT id FROM store.enlaces WHERE nombre='MIS ANUNCIOS'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),(SELECT id FROM store.enlaces WHERE nombre='Admin. Anuncios'),'rpmamani');



insert into store.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(3, 'daparicio', 'DALI APARICIO', crypt('12345', gen_salt('bf')), 'rpmamani');
INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(3,(SELECT id FROM store.roles WHERE nombre='ANUNCIOS'),'2050-01-01','{}','rpmamani');






alter table only store.anuncios add foreign key (pers_id) references store.usuarios(pers_id);
alter table only store.anuncios add foreign key (id_tipo_empleo) references store.tbl_tipos(id);
alter table only store.anuncios add foreign key (id_tipo_anuncio) references store.tbl_tipos(id);




CREATE OR REPLACE FUNCTION store.fn_b_anuncios(p_dato dtexto) RETURNS SETOF store.anuncios AS $$
    SELECT id, pers_id, id_tipo_empleo, id_tipo_anuncio, ci, facebook, celular, direccion, coordenadas, imagenes, anuncio, calificacion, estado, usuario, editado
      FROM store.anuncios
    WHERE upper(anuncio) like upper('%'||$1||'%')::dtexto;
$$ LANGUAGE SQL stable;
COMMENT ON FUNCTION store.fn_b_anuncios(p_dato dtexto) is 'Buscando anuncios.....';
SELECT * FROM store.fn_b_anuncios('a');


grant execute on function store.fn_b_anuncios(dtexto) to publico;
GRANT SELECT ON store.anuncios TO publico;
GRANT SELECT, INSERT ON store.usuarios TO publico;
*/
GRANT INSERT ON store.usr_roles TO publico;

grant execute on function store.create_user_anucios(dtexto2,dtexto2,dtexto2, djson) to publico;



commit;
