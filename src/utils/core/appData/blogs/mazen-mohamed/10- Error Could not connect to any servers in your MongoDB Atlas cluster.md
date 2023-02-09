---
title: Error Could not connect to any servers in your MongoDB Atlas cluster
Tags: mongodb cloud atlas connection error
image_alt: mongodb
thumbnailUrl: https://a.storyblok.com/f/114452/1080x608/f0f1d42a22/mongodb.png
description: When trying to connect to MongoDB you could encounter the following error Could not connect to any servers in your MongoDB Atlas cluster could happen for multiple reasons
---

When trying to connect to MongoDB you could encounter the following error:

```bash
Error: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
```

It Could happen for multiple reasons, which we will discuss here.

## Your network IP is not whitelisted

1. Go to [mongodb cloud atlas](https://www.mongodb.com/cloud/atlas).

2. login to your MongoDB atlas account.

3. Click on network access.

4. if you have already added an IP address, then here you can see the IP access list **click on delete**, if you have not already added an IP address, then just follow the below steps.

5. click on add the IP address.

6. select **add current IP address** or if you want you can also select **allow access from anywhere**.

7. type in a comment if you want.

8. click on confirm button.

9. this will show pending loader, wait until it shows active status.

10. now restart your server on the terminal by typing **restart your server**.

## Wrong credentials

Be sure to:

- use correct credentials like (username, password, database name, ...) when trying to connect.

- check DB user exists, go to Database access -> create new / edit and reset the password if don't remember.

- check database name, go to your cluster -> Browse Collections -> select a collection(database name: ex: sample_training)

## It may be due to system settings or some other tools or apps

It could happen for many reasons like:

### System's date and time are wrong

It could be that the system time and date are not correct, hence the connection to DB from the server was refused, try updating it, and restarting the server.

### Connecting to a VPN

If you had a VPN on while adding your IP to MongoDB Cloud and you don't have it on anymore (or vice-versa) you'll get this error.

### Firewall Problems

Check the firewall on your network. you could have set it to the highest security level at one point, setting it one level lower instead, or changing the network could fix it.

### Using a Proxy

If you are using any proxy or certificate-based internet then this problem could happen.

Try a different internet connection.

## Resources for further reading

[Error: "Could not connect to any servers in your MongoDB Atlas cluster"](https://stackoverflow.com/questions/61937581/error-could-not-connect-to-any-servers-in-your-mongodb-atlas-cluster)
