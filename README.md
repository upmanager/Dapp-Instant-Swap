# How to deploy the project to ubuntu!

### Install & build

> cd project-folder
> yarn install
> yarn build

### install & start pm2

> sudo apt install pm2
> pm2 start npm --name instantswap -- run start

### install & config apache2

> sudo apt install apache2
> sudo cd /etc/apache2/sites-available
> sudo nano instantswap.conf

#### instantsswap.conf file content

```
<VirtualHost *:80>
   ProxyPreserveHost On
   ProxyPass / http://127.0.0.1:3000/
   ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

> sudo a2dissite 000-default.conf
> sudo a2ensite instantswap.conf
> sudo a2enmod rewrite
> sudo systemctl restart apache2
