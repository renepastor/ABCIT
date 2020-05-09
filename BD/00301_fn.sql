/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

CREATE OR REPLACE FUNCTION store.fn_b_anuncios(p_dato dtexto) RETURNS SETOF store.anuncios AS $$
    SELECT pers_id, id_tipo_empleo, id_tipo_anuncio, ci, facebook, celular, direccion, coordenadas, imagenes, anuncio, calificacion, estado, usuario, editado
      FROM store.anuncios
    WHERE upper(anuncio) like upper('%'||$1||'%')::dtexto;
$$ LANGUAGE SQL stable;
COMMENT ON FUNCTION store.fn_b_anuncios(p_dato dtexto) is 'Buscando anuncios.....';
SELECT * FROM store.fn_b_anuncios('a');

commit;
