
/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/


begin;

alter table only store.anuncios add foreign key (pers_id) references store.usuarios(pers_id);
alter table only store.anuncios add foreign key (id_tipo_empleo) references store.tbl_tipos(id);
alter table only store.anuncios add foreign key (id_tipo_anuncio) references store.tbl_tipos(id);


commit;



