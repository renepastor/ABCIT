/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/

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
  fecha_limite dfecha2,
  estado destado,
  usuario duser,
  editado dfechahora
);


commit;
