/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/

/*
begin;
DROP role publico;
commit;



begin;
create role publico login password 'storeL3n404054ng3l40103H3l3n1003R3n30908';
commit;
*/

begin;
grant usage on schema store to publico;

commit;


begin;
grant execute on function store.auth(text, text) to publico;


grant execute on function store.fn_b_ingresos(dtexto) to publico;

GRANT SELECT ON store.ingresos TO publico;
GRANT SELECT ON store.tbl_tipos TO publico;
GRANT SELECT ON store.rubros TO publico;



grant execute on function store.fn_b_anuncios(dtexto) to publico;
GRANT SELECT ON store.anuncios TO publico;

commit;
