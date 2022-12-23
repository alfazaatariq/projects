Pada akhir course, terdapat submission yang harus dikerjakan sebagai syarat kelulusan. Submissionnya berupa membuat sebuah "Bookshelf API"  dengan rincian sebagai berikut :

 - API dapat menyimpan buku :
     API yang dapat menyimpan buku melalui route:
      Method : POST
      URL : /books

      
      Server merespons gagal bila:

        1. Client tidak melampirkan properti namepada request body. 
        
        2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
        
        3. Server gagal memasukkan buku karena alasan umum (generic error). 
        
       
       
      Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:
        Response Body:

        {
            "status": "success",
            "message": "Buku berhasil ditambahkan",
            "data": {
                "bookId": "1L7ZtDUFeGs7VlEt"
            }
        }
        
        
  - API dapat menampilkan seluruh buku :
    API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:
      Method : GET
      URL: /books

      Server harus mengembalikan respons dengan:

        Status Code : 200
        Response Body:

        {
            "status": "success",
            "data": {
                "books": [
                    {
                        "id": "Qbax5Oy7L8WKf74l",
                        "name": "Buku A",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "1L7ZtDUFeGs7VlEt",
                        "name": "Buku B",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "K8DZbfI-t3LrY7lD",
                        "name": "Buku C",
                        "publisher": "Dicoding Indonesia"
                    }
                ]
            }
        }
      
      Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.

        {
            "status": "success",
            "data": {
                "books": []
            }
        }
        
  - API dapat menampilkan seluruh buku :
      API dapat menampilkan seluruh buku yang disimpan melalui route:

        Method : GET
        URL: /books/{bookId}

        Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server mengembalikan respons dengan:

        Status Code : 404
        Response Body:

        {
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }
        Bila buku dengan id yang dilampirkan ditemukan, maka server mengembalikan respons dengan:

        Status Code : 200
        Response Body:

        {
            "status": "success",
            "data": {
                "book": {
                    "id": "aWZBUW3JN_VBE-9I",
                    "name": "Buku A Revisi",
                    "year": 2011,
                    "author": "Jane Doe",
                    "summary": "Lorem Dolor sit Amet",
                    "publisher": "Dicoding",
                    "pageCount": 200,
                    "readPage": 26,
                    "finished": false,
                    "reading": false,
                    "insertedAt": "2021-03-05T06:14:28.930Z",
                    "updatedAt": "2021-03-05T06:14:30.718Z"
                }
            }
        }
  - API dapat mengubah data buku : 
      API dapat mengubah data buku berdasarkan id melalui route:

      Method : PUT
      URL : /books/{bookId}
      Body Request:

      {
          "name": string,
          "year": number,
          "author": string,
          "summary": string,
          "publisher": string,
          "pageCount": number,
          "readPage": number,
          "reading": boolean
      }
      
      Server merespons gagal bila:

        1. Client tidak melampirkan properti name pada request body. 
        2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. 
        3. Id yang dilampirkan oleh client tidak ditemukkan oleh server. 
     
      Bila buku berhasil diperbarui, server mengembalikan respons dengan:

      Status Code : 200
      Response Body:

      {
          "status": "success",
          "message": "Buku berhasil diperbarui"
      }


  - API dapat menghapus buku
      API dapat menghapus buku berdasarkan id melalui route berikut:

      Method : DELETE
      URL: /books/{bookId}
      
      Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server mengembalikan respons berikut:

      Status Code : 404
      Response Body:

      {
          "status": "fail",
          "message": "Buku gagal dihapus. Id tidak ditemukan"
      }
      
      Bila id dimiliki oleh salah satu buku, maka buku tersebut dihapus dan server mengembalikan respons berikut:

      Status Code : 200
      Response Body:

      {
          "status": "success",
          "message": "Buku berhasil dihapus"
      }

