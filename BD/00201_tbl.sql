/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/

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
  imagenes djson default '[]',
  anuncio dtexto,
  calificacion dentero4,
  estado destado,
  usuario duser,
  editado dfechahora
);


commit;
