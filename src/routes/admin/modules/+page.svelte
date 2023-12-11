<svelte:head>
  <title>PV-A Modulverwaltung</title>
  <meta name="description" content="About this app" />
</svelte:head>

<h3 class="text-center mt-4">Modulverwaltung</h3>

<div class="container bg-body-tertiary border my-4 p-3 shadow-sm">
  <form action="" class="row g-3">
    <div class="col-12 fs-5">Modulinformationen</div>
    <div class="col-12">
      <label for="moduleId" class="form-label">Modul-Name</label>
      <input type="text" class="form-control" id="moduleId" placeholder="XYZ" />
    </div>
    <div class="col-sm-6">
      <label for="moduleId" class="form-label">Modul-ID</label>
      <input
        type="text"
        class="form-control"
        id="moduleId"
        placeholder="012345"
      />
    </div>
    <div class="col-sm-6">
      <label for="credits" class="form-label">Credits</label>
      <input type="text" class="form-control" id="credits" placeholder="3" />
    </div>

    <div class="col-12 fs-5 mt-5">Modulprüfungen</div>
    <div class="col-sm-4 d-flex align-items-center">
      <span class="fw-bold">Prüfung 1</span>
    </div>
    <div class="col-sm-4">
      <label for="type" class="form-label">Prüfungsart</label>
      <select class="form-select" id="credits">
        <option selected>schriftliche Prüfung</option>
        <option>mündliche Prüfung</option>
        <option>Prüfungsvorleistung</option>
      </select>
    </div>
    <div class="col-12">
      <button class="btn btn-success btn-sm">Weitere Prüfung hinzufügen</button>
    </div>

    <div class="col-12 fs-5 mt-5">Typ des Moduls für verschiedene Kurse</div>
    <div class="col-sm-4 d-flex align-items-center">
      <span class="fw-bold">Eingebettete Systeme</span>
    </div>
    <div class="col-sm-4">
      <label for="type" class="form-label">Modulart</label>
      <select class="form-select" id="credits">
        <option selected>Basismodul</option>
        <option>Wahlpflichtmodul</option>
        <option>Ergänzungsmodul</option>
      </select>
    </div>
    <div class="col-sm-4">
      <label for="credits" class="form-label">Geplantes Semester</label>
      <input type="text" class="form-control" id="credits" placeholder="1-6" />
    </div>

    <div class="col-sm-4 d-flex align-items-center">
      <span class="fw-bold">Medieninformatik</span>
    </div>
    <div class="col-sm-4">
      <label for="type" class="form-label">Modulart</label>
      <select class="form-select" id="credits">
        <option selected>Basismodul</option>
        <option>Wahlpflichtmodul</option>
        <option>Ergänzungsmodul</option>
      </select>
    </div>
    <div class="col-sm-4">
      <label for="credits" class="form-label">Geplantes Semester</label>
      <input type="text" class="form-control" id="credits" placeholder="1-6" />
    </div>

    <div class="col-sm-4 d-flex align-items-center">
      <span class="fw-bold">Verteilte Systeme</span>
    </div>
    <div class="col-sm-4">
      <label for="type" class="form-label">Modulart</label>
      <select class="form-select" id="credits">
        <option selected>Basismodul</option>
        <option>Wahlpflichtmodul</option>
        <option>Ergänzungsmodul</option>
      </select>
    </div>
    <div class="col-sm-4">
      <label for="credits" class="form-label">Geplantes Semester</label>
      <input type="text" class="form-control" id="credits" placeholder="1-6" />
    </div>

    <div class="col-sm-4 d-flex align-items-center">
      <span class="fw-bold">Computergrafik</span>
    </div>
    <div class="col-sm-4">
      <label for="type" class="form-label">Modulart</label>
      <select class="form-select" id="credits">
        <option selected>Basismodul</option>
        <option>Wahlpflichtmodul</option>
        <option>Ergänzungsmodul</option>
      </select>
    </div>
    <div class="col-sm-4">
      <label for="credits" class="form-label">Geplantes Semester</label>
      <input type="text" class="form-control" id="credits" placeholder="1-6" />
    </div>
  </form>
</div>
