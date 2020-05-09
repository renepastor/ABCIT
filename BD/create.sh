#!/bin/bash
host_bd="localhost"
#####name_bd="BDSTORE"
name_bd="BDSTORE_DEV"
echo "Borrar $name_bd"
echo "Host BD: $host_bd"
dropdb $name_bd


createdb $name_bd
echo "Crear BD $name_bd"

echo '************ INICIO *******' > error
echo '    ******* Tablas ....' >> error
psql $name_bd < 00100_domain.sql 2>> error > log
psql $name_bd < 00200_tbl.sql 2>> error >> log
psql $name_bd < 00201_tbl.sql 2>> error >> log


echo '    ******* Funciones....' >> error
psql $name_bd < 00300_fn.sql 2>> error >> log
psql $name_bd < 00301_fn.sql 2>> error >> log
echo '    ******* Datos....' >> error
psql $name_bd < 00400_data.sql 2>> error >> log
psql $name_bd < 00401_data.sql 2>> error >> log

echo '    ******* Referencias....' >> error
psql $name_bd < 00500_ref.sql 2>> error >> log
psql $name_bd < 00501_ref.sql 2>> error >> log

echo '    ******* Grant....' >> error
psql $name_bd < 00700_grant.sql 2>> error >> log


##psql $name_bd < 00701_grant_app.sql 2>> error >> log



echo '************ FIN ************' >> error
