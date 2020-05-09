/*aut: renepastor@gmail.com
  fec:02/08/2019
*/
begin;


-------******ROLES******--
--SELECT setval('store.roles_id_seq', 1);
insert into store.roles (sistema, nombre, descripcion,usuario) values 
('ABIT-STOR', 'ADMINISTRADOR', 'ADMINISTRADOR DEL SISTEMA',1),
('ABIT-STOR', 'ADMIN. ALMACEN', 'ADMINISTRADOR DEL ALMACEN',1),
('ABIT-STOR', 'REPARTIDOR', 'REPARTIDOR DEL PRODUCTO',1);

-------******ENLACES******--
--SELECT setval('store.enlaces_id_seq', 1);
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1,1,2,'MENU','fa-bars', '', '','rpmamani');

insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1,1,2,'TINEDA','fa-dashboard', 'javascript:void(0)', '','rpmamani');
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM store.enlaces WHERE nombre='TINEDA'),2,20,'Admin. Ingresos','fa-user-md', '#/adminIngresos', '','rpmamani');
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM store.enlaces WHERE nombre='TINEDA'),2,20,'Solicitud de Compra','fa-ambulance', '#/solicitudes', '','rpmamani');
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM store.enlaces WHERE nombre='TINEDA'),2,20,'Entregas','fa-hospital-o', '#/entregas', '','rpmamani');
insert into store.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM store.enlaces WHERE nombre='TINEDA'),2,20,'Rep. Inventario','fa-bar-chart', '#/repInventario', '','rpmamani');

-------******MENUS******--
insert into store.menues (rol_id, enla_id,usuario) values
((SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),(SELECT id FROM store.enlaces WHERE nombre='TINEDA'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),(SELECT id FROM store.enlaces WHERE nombre='Admin. Ingresos'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),(SELECT id FROM store.enlaces WHERE nombre='Solicitud de Compra'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),(SELECT id FROM store.enlaces WHERE nombre='Entregas'),'rpmamani'),
((SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),(SELECT id FROM store.enlaces WHERE nombre='Rep. Inventario'),'rpmamani');

-------******USUARIO ROL******--
--SELECT setval('store.usr_roles_id_seq', 1);
insert into store.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(1, 'rpmamani', 'RENE PASTOR MAMANI FLORES', crypt('12345', gen_salt('bf')), 'rpmamani');
INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1,(SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),'2050-01-01','{}','rpmamani');

insert into store.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(2, 'jvictor', 'JAIME VICTOR MAMANI FLORES', crypt('12345', gen_salt('bf')), 'rpmamani');
INSERT INTO store.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(2,(SELECT id FROM store.roles WHERE nombre='ADMINISTRADOR'),'2050-01-01','{}','rpmamani');




-------******* PARAMETROS *****----
INSERT INTO store.parametros (campo,valor,sistema,descripcion,usuario)
VALUES('TIME-SESSION','30','SESSION', 'TIEMPO DE SESSION DEL USUARIO',1);

-------******* TBL TIPOS *****----
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(1,'--','0','Inicio','Es el origen de la tabla','null',1);

-------******TBL TIPOS******--
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(1,'TP-MONEDA','TIPO DE MONEDA','TIPO DE MONEDA','','',1);
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(store.fn_tipo_nombre_id('TP-MONEDA'),'BOL','BS','BOLIVIANOS','','',1);
INSERT INTO store.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(store.fn_tipo_nombre_id('TP-MONEDA'),'SUS','$US','DOLARES AMERICANOS','','',1);

INSERT INTO store.unidades_medida (abreviatura, unidad, usuario) VALUES
('UN','UNIDAD',1),
('PZ','PIEZA',1),
('LT','LITRO',1),
('KG','KILOGRAMO',1);

INSERT INTO store.rubros (id_padre, codigo, rubro, usuario, estado) VALUES
(1, '000','**ORIGEN**',1, 'E'),
(1, '001','COMESTIBLES',1, 'C'),
(1, '002','VESTIMENTA',1, 'C'),
(1, '003','MATERIAL DE ESCRITORIO',1, 'C'),
(1, '004','SALUD',1, 'C'),
(1, '005','IMPLEMENTO DEPORTIVO',1, 'C');

/*
INSERT INTO store.productos (id_rubro, nombre, usuario) VALUES
(3,'ABRIGOS',1),
(3,'CHOMPAS',1),
(4,'CUADERNO CARTA',1),
(4,'PAPEL BON',1),
(6,'FAJAS TERMICAS',1);
*/
INSERT INTO store.almacenes (id_administrador, nombre, direccion, coordenadas, usuario) VALUES
(1,'ALMACEN 1','C/ BUENO', '[0,0]',1),
(2,'ALMACEN 2','AB SUCRE', '[0,0]',1);


commit;

