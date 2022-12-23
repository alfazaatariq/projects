Pada akhir course, terdapat submission yang harus dikerjakan sebagai syarat kelulusan. Submissionnya berupa membuat sebuah "Bookshelf Apps" yang dapat memasukan data buku ke dalam rak, memindahkan data buku antar rak, dan menghapus data buku dari rak, dengan rincian sebagai berikut :

  - Mampu Menambahkan Data Buku :
      1. Bookshelf Apps dapat menambahkan data buku baru.
      2. Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:
            {
              id: string | number,
              title: string,
              author: string,
              year: number,
              isComplete: boolean,
            }
            
  - Memiliki Dua Rak Buku :
      1. Bookshelf Apps memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
      2. Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai false.
      3. Rak buku "Selesai dibaca" hanya menyimpan buku jika properti isComplete bernilai true.
     
     
  - Dapat Memindahkan Buku antar Rak :
      1. Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" dapat dipindahkan di antara keduanya.


  - Dapat Menghapus Data Buku :
      1. Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" dapat dihapus.

  - Memanfaatkan localStorage dalam Menyimpan Data Buku :
      1. Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" dapat bertahan walaupun halaman web ditutup.


