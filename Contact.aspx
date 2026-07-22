<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>

<body>

<div class="container">

    <h1>GUEST BOOK</h1>
    
    <button class="page_box">
    <a href="index.html">HOME</a></button>
    <button class="page_box" >
        <a href="Portfolio.aspx">PORTFOLIO</a></button>
    <button class="page_box" >
        <a href="Profile.aspx">CV</a></button>
    <button class="page_box" >
    <a href="HW1.html">HOMEWORK 1</a></button>
    <button class="page_box" >
    <a href="HW2.html">HOMEWORK 2</a></button>
    <button class="page_box" >
    <a href="HW3.html">HOMEWORK 3</a></button>
    <button class="page_box" >  
        <a href="About.aspx">ABOUT</a></button>
    <button class="page_box" style="background-color: darkblue;">
    <a href="Contact.aspx">GUEST BOOK</a></button>
    <br>
    <br>
    <h2>Guest Book</h2>
    <p id="liveClock" style="font-weight: bold;text-align: right;font-size: 24px;"></p>
    <p>ติดต่อฉันได้ที่นี่ ผ่านแบบฟอร์มด้านล่าง</p>
    <img src="image/Contact.png" alt="Guest Book" width="600">
    <div style="margin-top: 20px; text-align: left;">
    <p style="font-weight: bold;text-align: center;" ><a href="https://gmail.com" target="_blank" style="text-decoration: underline;font-size: 20px;">https://gmail.com</a></p>

        <h3>Leave a Comment</h3>
        <div id="statusMessage" style="margin-bottom: 10px; padding: 10px; background: #f8f8f8; border: 1px solid #ddd; display: none;"></div>
        <form id="form1" runat="server" method="post" action="Contact.aspx" onsubmit="submitComment(event)">
            <label for="commentName">Name:</label>
            <input type="text" id="commentName" name="commentName" style="width: 100%; margin-bottom: 10px;">
            <label for="commentMessage">Comment:</label>
            <textarea id="commentMessage" name="commentMessage" rows="4" style="width: 100%; margin-bottom: 10px;"></textarea>
            <button type="submit" style="font-size: 18px; padding: 10px 20px;">Post Comment</button>
        </form>

        <h3>Comments</h3>
        <ul id="commentList" style="list-style: none; padding: 0;"></ul>
    </div>
    <br>
    <p class="p1"></p>

</div>
<script src="JS_scipt/time.js"></script>
<script src="JS_scipt/commet_fun/comment.js"></script>
<footer>
        © 2026 Personal Website
    </footer>
</body>
</html>