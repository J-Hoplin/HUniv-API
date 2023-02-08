exports.issuedTokenRefreshed = (expiredate, key) => `<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hongik Univ API</title>
    </head>
    
    <body>
        <h2>API Key가 재발급 되었습니다.</h2>
        <ul>
            <li>만료일 : ${expiredate}</li>
            <li>Key : ${key}</li>
        </ul>
    </body>
    
    </html>`;
