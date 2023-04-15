from flask import Flask,request,jsonify
from flask_cors import CORS
import random
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
import smtplib,ssl
import numpy as np
import mysql.connector
import pandas as pd
from sklearn.linear_model import ElasticNet
import joblib
import csv
import json

app=Flask(__name__)
CORS(app)


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="cb"
)

# create a cursor object
mycursor = mydb.cursor()

def mail_send(otp,mail):
    try:
        s = smtplib.SMTP('smtp.office365.com', 587)
    except Exception as e:
        s = smtplib.SMTP_SSL('smtp.office365.com', 465)
    s.ehlo()
    s.starttls()
    s.login("your_outlook_email", "your_password")
        
    msg = MIMEMultipart()
    msg['From']='your_outlook_email'
    msg['To']=mail
    msg['Subject']="Registration Confirmation"

    html=f'''\
        <!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        body,
        table,
        td,
        a {"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"}
        table,td {"mso-table-lspace: 0pt;mso-table-rspace: 0pt;"}
        img {"-ms-interpolation-mode: bicubic;"}
        /* RESET STYLES */
        img {"border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"}

        table {"border-collapse: collapse !important;"}

        body {"height: 100% !important;margin: 0 !important;padding: 0 !important;width: 100% !important;"}

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {"color: inherit !important;text-decoration: none !important;font-size: inherit !important;font-family: inherit !important;font-weight: inherit !important;line-height: inherit !important;"}

        /* MOBILE STYLES */
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {"margin: 0 !important;"}
    </style>
</head>

<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Here is your One Time Password
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        
        <tr>
            <td bgcolor="#bf1591" align="center" style="padding: 60px 10px 0px 10px; background-color: linear-gradient(135deg, #f26ace 10%, #bf1591 100%)">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hey there!</h1> <img src="https://i.ibb.co/G0t2czh/logo.jpg" width="125" height="120" srcset="" style="display: block; border: 0px;" alt="Logo" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 20px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 10px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <h3 style="margin: 0; " align="center">Here is your One Time Password</h3>
                        </td>
                    </tr>
					<tr>
                        <td bgcolor="#ffffff" align="left" style=" color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; " align="center">to validate your email address</p>
                        </td>
                    </tr>
					
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 0px 5px 0px 20px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px; " ><h1 style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 70px; letter-spacing: 15px;">{otp}</h1></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style=" color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px; padding-bottom: 20px;">
                            <p style="margin: 0; color: #ff4d4d;" align="center" >Valid for 5 minutes only</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;" align="center">If you didn't request this , you can ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; "align="center">Thanks!<br>CB Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
    </table>
</body>
</html>
        
        '''
    msg.attach(MIMEText(html, 'html'))
    
    s.send_message(msg)
    return "Success"

def otp_gen():
    digit="0123456789"
    password=""
    i=0
    for i in range(6):
        password=password+random.choice(digit)
        i+1
    print("Your password is "+str(password))
    file1 = open("myfile.txt","w")
    file1.write(password)
    file1.close()
    return password

@app.route('/register',methods=["POST"])
def register():
    mail=request.json['umail']
    pwd=request.json['upwd']
    opt=otp_gen()
    mm=mail_send(opt, mail)
    sql = "INSERT INTO users (user_mail,user_password) VALUES (%s, %s)"
    values = (mail, pwd)
    mycursor.execute(sql, values)
    mydb.commit()
    
    return jsonify(opt)

@app.route('/sregister',methods=["POST"])
def sregister():
    mail=request.json['umail']
    pwd=request.json['upwd']
    uid=request.json['uid']
    opt=otp_gen()
    mm=mail_send(opt, mail)
    sql = "INSERT INTO users (user_mail,user_password) VALUES (%s, %s)"
    values = (mail, pwd)
    mycursor.execute(sql, values)
    mydb.commit()
    
    return jsonify(opt)

@app.route('/otp',methods=["GET"])
def otp():
    file1 = open("myfile.txt","r+")
    myotp=file1.read()
    return jsonify(myotp)

@app.route('/login',methods=["POST"])
def login():
    mail=request.json['umail']
    pwd=request.json['upwd']
    sql = "SELECT * FROM users WHERE user_mail = %s AND user_password = %s"
    values = (mail, pwd)
    mycursor.execute(sql, values)
    result = mycursor.fetchone()
    if result:
        return jsonify('Success')
    else:
        return jsonify('Not')

@app.route('/receive', methods=['POST'])
def receive_array():
    data = request.get_json()
    cie1 = np.array(data['cie1'])
    cie2 = np.array(data['cie2'])
    cie3 = np.array(data['cie3'])
    df=pd.read_csv("subject1.csv")
    x=df.drop("Semester",axis=1)
    y=df["Semester"]
    model=ElasticNet(alpha=0.01,l1_ratio=0.75)
    feature_names = list(x.columns)
    model.fit(x,y)

    joblib.dump(model,"subject1.pkl")
    mask = cie1 != ''
    cie1 = cie1[mask]
    mask = cie2 != ''
    cie2 = cie2[mask]
    mask = cie3 != ''
    cie3 = cie3[mask]
    

    model=joblib.load("subject1.pkl")
    dumm=""
    for i in range(len(cie1)):
        dumm+=str(model.predict([[int(cie1[i]),int(cie2[i]),int(cie3[i])]]))+","
    dumm=dumm.replace("[", "")
    dumm=dumm.replace("]", "")
    print(dumm)
    arr=np.array(str.split(","))
    file=open("mdata.csv","w")
    file.write("Labels,Marks")
    dumm1=""
    for i in range(len(arr)):
        dumm1+="Subject"+str(i)+","+arr[i]
        file.write(dumm1)
    file.close()
    
    return jsonify(dumm)
    
@app.route('/result',methods=["GET"])
def result():
    csvfile = open('mdata.csv', 'r')
    reader = csv.DictReader(csvfile)
    json_data = json.dumps([row for row in reader])
    return jsonify(json_data)

if '__main__'== __name__:
    app.run(debug=True)
