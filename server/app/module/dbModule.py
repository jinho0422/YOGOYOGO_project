import pymysql

class Database():
    def __init__(self):
        self.db=pymysql.connect(host='k02a2031.p.ssafy.io',
        user='yogo',password='recipe',db='yogo',charset='utf8')
        self.cursor=self.db.cursor(pymysql.cursors.DictCursor)

    def execute(self,query,args={}):
        print('sql')
        self.cursor.execute(query,args)

    def executeOne(self,query,args={}):
        self.cursor.execute(query,args)
        row=self.cursor.fetchone()  
        return row

    def executeAll(self,query,args={}):
        self.cursor.execute(query,args)
        row=self.cursor.fetchall()  
        return row

    def commit(self):
        self.db.commit()