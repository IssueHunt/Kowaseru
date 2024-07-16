# Existing Vulnerabilities

- SQLi
- IDOR
- XSS
- Open Redirect
- CSRF

## SQLi

When searching a post, `keyword` search param is not escaped.

```
/search?keyword=
```

```
http://localhost:4000/search?keyword=a%25%27%20AND%20SLEEP(5)%20AND%20%27a%27%20LIKE%20%27%25a
```

### Limited SQLi

Knex v2.3.0 causes it.

When db parameter is an object, this version of knex directly stringify the object into JSON string and directly send to DB without any validation or sanitization.

```
// Will throw an error (You can see json string is directly injected to the sql query from the error message)
http://localhost:4000/search?user_id[non_exist_param]=test

// Won't throw an error
http://localhost:4000/search?user_id[name]=test
```

## IDOR

Attackers can change other user's username by modifying `:userId` route parameter.

```
POST /users/:userId
```

## XSS

Username on the top nav bar is not escaped.

```
<script>alert('XSS')</script>
```

## Open Redirect

`from` parameter, which is used to determine where to redirect after creating a comment and deleting a comment or a post, is not validated.

```
POST /posts/:postId/delete
POST /comments
POST /comments/:commentId/delete
```

## CSRF

No CSRF prevention has been implemented. All forms are vulnerable against CSRF. (Anti-CSRF token will be introduced.)

# Others

SSH key pairs, `kowaseru-access` and `kowaseru-access.pub`, are not being used by any services. They are generated to check behavior of conventional secret scanners.
