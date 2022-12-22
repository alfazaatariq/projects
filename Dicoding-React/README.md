Project ini merupakan lanjutan dari submission course sebelumnya, dengan penambahan beberapa fitur dengan rincian sebagai berikut :
  - Memanfaatkan RESTful API sebagai sumber data :
      1. RESTful API yang digunakan adalah https://notes-api.dicoding.dev/v1.
      2. Menggunakan RESTful API sebagai sumber data dalam berbagai fitur di aplikasi catatan, seperti:
            registrasi dan autentikasi,
            daftar catatan,
            daftar catatan terarsip,
            detil catatan,
            arsip/batal arsip catatan, dan
            hapus catatan.
            
  - Registrasi dan Autentikasi Pengguna :
      Aplikasi memiliki fitur registrasi dan autentikasi (login) pengguna dengan detail berikut :
        1. Halaman untuk registrasi pengguna dengan input:
            nama,
            email,
            password, dan
            confirm password
        2. Halaman baru untuk autentikasi (login) pengguna dengan input email dan password.
        3. Menyimpan access token dari proses autentikasi di local storage.
        4. Simpan data pengguna yang terautentikasi pada komponen state untuk mengetahui pengguna telah terautentikasi atau belum.
        5. Tombol logout (keluar aplikasi) untuk menghapus autentikasi pengguna yang tersimpan.
        
  - Memproteksi Fitur Catatan :
      Fitur catatan hanya dapat diakses oleh pengguna yang telah terautentikasi. Berikut detailnya : 
        1. Fitur catatan seperti daftar catatan, detail catatan, dan hapus catatan hanya dapat diakses bila pengguna telah melakukan autentikasi. Bila belum, pengguna hanya dapat mengakses halaman login atau registrasi saja.
        2. Menampilkan resource catatan yang hanya dimiliki oleh pengguna yang terautentikasi.
        
  - Ubah Tema :
      Aplikasi memiliki fitur ubah tema. Berikut detailnya :
        1. Terdapat tombol untuk mengubah tema gelap/terang.
        2. Memanfaatkan React Context dalam membangun fitur ubah tema.
        3. Menyimpan perubahan tema ke local storage agar perubahannya persisten.

  - Menggunakan Hooks 
  
  
  - indikasi loading :
      1. Aplikasi dapat menampilkan indikasi loading ketika memuat data dari RESTful API sedang berlangsung.
      
      
  - Fitur ubah bahasa :
      1. Terdapat tombol untuk mengubah bahasa Indonesia ke Inggris, atau sebaliknya.
      2. Memanfaatkan React Context dalam membangun fitur ubah bahasa.
      3. Menyimpan perubahan bahasa ke local storage agar perubahannya persisten.

  
