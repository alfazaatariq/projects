const addBooks = () => {
  let judul = document.querySelector("#judul").value;
  let penulis = document.querySelector("#penulis").value;
  let tahun = document.querySelector("#tahun").value;
  let isRead = document.querySelector("#selesai").checked;
  let x = new Date();
  let num = x.getTime();

  let buku = {
    id: num,
    title: judul,
    author: penulis,
    year: tahun,
    isComplete: isRead,
  };

  const locStorage = localStorage.getItem("book");

  let store = [];
  if (judul.trim().length != 0 && penulis.trim().length != 0 && tahun.trim().length != 0) {
    if (locStorage != null) {
      store = JSON.parse(locStorage);
      store.push(buku);
      localStorage.setItem("book", JSON.stringify(store));
    } else {
      store.push(buku);
      localStorage.setItem("book", JSON.stringify(store));
    }
  } else {
    return;
  }

};

const displayBooks = () => {
  const locStorage = localStorage.getItem("book");
  let obj = JSON.parse(locStorage);
  let arr = [obj];

  obj.forEach((data, index, save) => {
    let title = document.createElement("h3");
    let author = document.createElement("h6");
    let year = document.createElement("h6");

    let sudah = document.querySelector(".sudah-dibaca");
    let belum = document.querySelector(".belum-dibaca");
    let itemContainer = document.createElement("div");
    itemContainer.className = "books";

    let btnContainer = document.createElement("div");
    btnContainer.className = "container-row";

    let btnChange = document.createElement("input");
    btnChange.type = "button";
    btnChange.className = "btn-change";
    btnChange.id = "btnChange";

    let btnHapus = document.createElement("input");
    let modal = document.querySelector(".modal");

    btnHapus.addEventListener("click", () => {
      modal.style.display = "block";
      let iya = document.querySelector("#iyah");
      iya.addEventListener("click", () => {
        save.splice(index, 1);
        localStorage.setItem("book", JSON.stringify(...arr));
        modal.style.display = "none";
        clearOutput();
        displayBooks();
      })
      let tidak = document.querySelector("#gaa");
      tidak.addEventListener("click", () => {
        modal.style.display = "none";
      })
    })

    btnHapus.type = "button";
    btnHapus.className = "btn-hapus";
    btnHapus.id = "btnHapus";

    title.innerText = data.title;
    author.innerText = `Author : ${data.author}`;
    year.innerText = `Years : ${data.year}`;
    let check = data.isComplete;

    if (check) {
      btnChange.value = "Belum Dibaca";
      btnChange.addEventListener("click", () => {
        clearOutput();
        data.isComplete = false;
        localStorage.setItem("book", JSON.stringify(...arr));
        displayBooks();
      });
      btnHapus.value = "Hapus";
      sudah.appendChild(itemContainer);
      itemContainer.appendChild(title);
      itemContainer.appendChild(author);
      itemContainer.appendChild(year);
      itemContainer.appendChild(btnContainer);
      btnContainer.appendChild(btnChange);
      btnContainer.appendChild(btnHapus);
    } else if (!check) {
      btnChange.value = "Sudah Dibaca";
      btnChange.addEventListener("click", () => {
        clearOutput();
        data.isComplete = true;
        localStorage.setItem("book", JSON.stringify(...arr));
        displayBooks();
      });
      btnHapus.value = "Hapus";
      belum.appendChild(itemContainer);
      itemContainer.appendChild(title);
      itemContainer.appendChild(author);
      itemContainer.appendChild(year);
      itemContainer.appendChild(btnContainer);
      btnContainer.appendChild(btnChange);
      btnContainer.appendChild(btnHapus);
    }
  });
};

const clearOutput = () => {
  const sudahDibaca = document.querySelector(".sudah-dibaca");
  const belumDibaca = document.querySelector(".belum-dibaca");
  sudahDibaca.innerHTML = "<h3>Sudah Dibaca</h3>";
  belumDibaca.innerHTML = "<h3>Belum Dibaca</h3>";
};

const searchBooks = () => {
  let searchTitle = document.querySelector("#judulBuku").value;
  const locStorage = localStorage.getItem("book");
  const obj = JSON.parse(locStorage);
  let arr = [obj];

  const searched = document.querySelector(".search");
  searched.innerHTML = `
  <h3>Cari</h3>
  <input type="search" name="" id="judulBuku" placeholder="Judul" />
  <input
    onclick="searchBooks()"
    type="button"
    value="Cari Buku!"
    id="cari"
  />
  `;

  obj.forEach((data, index, save) => {
    if (data.title.toLowerCase().includes(searchTitle.toLowerCase())) {
      let title = document.createElement("h3");
      let author = document.createElement("h6");
      let year = document.createElement("h6");
      let searchResult = document.querySelector(".search");

      let itemContainer = document.createElement("div");
      itemContainer.className = "books";

      let btnContainer = document.createElement("div");
      btnContainer.className = "container-row";

      let btnChange = document.createElement("input");
      btnChange.type = "button";
      btnChange.className = "btn-change";
      btnChange.id = "btnChange";

      let btnHapus = document.createElement("input");
      let modal = document.querySelector(".modal");
      
      btnHapus.type = "button";
      btnHapus.className = "btn-hapus";
      btnHapus.id = "btnHapus";
      btnHapus.addEventListener("click", () => {
        modal.style.display = "block";
        let iya = document.querySelector("#iyah");
        iya.addEventListener("click", () => {
          save.splice(index, 1);
          localStorage.setItem("book", JSON.stringify(...arr));
          modal.style.display = "none";
          clearOutput();
          displayBooks();
          searchBooks();
        })
        let tidak = document.querySelector("#gaa");
        tidak.addEventListener("click", () => {
          modal.style.display = "none";
        })
      })

      title.innerText = data.title;
      author.innerText = `Author : ${data.author}`;
      year.innerText = `Years : ${data.year}`;
      let check = data.isComplete;

      if (check) {
        btnChange.value = "Belum Dibaca";
        btnChange.addEventListener("click", () => {
          clearOutput();
          searchBooks();
          btnChange.value = "Sudah Dibaca";
          data.isComplete = false;
          localStorage.setItem("book", JSON.stringify(...arr));
          displayBooks();
        });
        btnHapus.value = "Hapus";
        searchResult.appendChild(itemContainer);
        itemContainer.appendChild(title);
        itemContainer.appendChild(author);
        itemContainer.appendChild(year);
        itemContainer.appendChild(btnContainer);
        btnContainer.appendChild(btnChange);
        btnContainer.appendChild(btnHapus);
      } else if (!check) {
        btnChange.value = "Sudah Dibaca";
        btnChange.addEventListener("click", () => {
          clearOutput();
          searchBooks();
          btnChange.value = "Belum Dibaca";
          data.isComplete = true;
          localStorage.setItem("book", JSON.stringify(...arr));
          displayBooks();
        });
        btnHapus.value = "Hapus";
        searchResult.appendChild(itemContainer);
        itemContainer.appendChild(title);
        itemContainer.appendChild(author);
        itemContainer.appendChild(year);
        itemContainer.appendChild(btnContainer);
        btnContainer.appendChild(btnChange);
        btnContainer.appendChild(btnHapus);
      }
    } else if (!data.title.toLowerCase().includes(searchTitle)) {
      return;
    } else if (searchTitle.length == 0) {
      return;
    }
  });

  if (searchTitle.length == 0) {
    searched.innerHTML = `
  <h3>Cari</h3>
  <input type="search" name="" id="judulBuku" placeholder="Judul" />
  <input
    onclick="searchBooks()"
    type="button"
    value="Cari Buku!"
    id="cari"
  />
  `;
  }
};

displayBooks();
