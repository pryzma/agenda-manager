# DigitalOcean droplet

## **Preinstallation**

When setting up your droplet, DigitalOcean gives you the option to preinstall packages, frameworks, stacks (NodeJS, LAMP/LEMP, Django, etc.)<br>
For Agendamanager I decided to preinstall NodeJS.

## **Nginx**

Nginx is a web server.<br>
DigitalOcean offers great resources on how to setup [Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04).
Below I'll list the folder structure and some commands which I commonly use 

<br>

agendamanager.nl's configuration file can be found in:

    /etc/nginx/sites-available/agendamanager.nl

The config file consists of multiple server blocks, like this:

    server { }

Server blocks are used to host multiple (sub)-domains on a server, in our example we're running agendamanager.nl, dev.agendamanager.nl and acc.agendamanager.nl on the same server. There are also server blocks for HTTP and HTTPS traffic for each of these servers.

<br>

Nginx has the ability to use snippets (reusable code). I use these for the SSL, PHPMyAdmin and NodeJS configuration. They can be found in:

    /etc/nginx/snippets

<br>

When changing anything in Nginx's configuration file (this includes snippets) it's good practice to make sure the file does not have any syntax errors by running this command:

    nginx -t


If you forget to do this (as I have done plenty of times), check the status of Nginx:

    systemctl status nginx

Then fix your errors and restart it:

    systemctl start nginx

If you need to stop running Nginx for whatever reason:

    systemctl stop nginx

If you're making updates to the Nginx configuration file and don't want to take the server offline, you can hot reload Nginx:

    systemctl reload nginx

<br>

## **Cron**

Cron is the most used scheduler for Linux. With Cron you can automate repetitive tasks such as pulling changes from the GitHub repository and schedule them. Use [crontab.guru](crontab.guru) to learn how the scheduler works.

List cron tasks:

    crontab -l

Edit cron tasks:

    crontab -e

<br>

## **Certbot**

Certbot is a free tool for automatically obtaining Let's Encrypt certificates to enable HTTPS on your server.

As with most tools DigitalOcean has a great tutorial on how to use [Certbot](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)

Below I'll list some things you might glance over when reading this tutorial but which are super important to know to successfully obtain your Let's Encrypt certificate


