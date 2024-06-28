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
http://localhost:4000/search?keyword=a%25%27+AND+pg_sleep%285%29+%7C%7C+%27a%27+LIKE+%27%25a
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
