Have node 14 or greater installed

clone the package and then npm i - thas should install the correct packages

Have TO up and running with the db attached that you want to do local syncs to s3 and signed in to the tenant

On the local-pos-syncer-v2 run npm run start - this will open said browser and then paste the details required

Details required would be your deviceUID, the tenant in question and the list of host_tab_ids in an string format like this 
"9f972ff1-2b9a-4459-802e-e1dc235ddc8d","f1e7b9c1-bccb-475f-ada8-10d19a65c579" etc if its multiple else "f1e7b9c1-bccb-475f-ada8-10d19a65c579"

Then press submit 

then check the db on POS under the transactionSyncLog table and you will see events Type **TAB** and **Acknowledged** to 1 - confirm on s3 - Note it sync to Todays date
