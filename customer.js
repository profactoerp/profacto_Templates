

fetch(
    "http://shukrullahs-macbook-air.local:8080/4DAction/api_get?token=2A4E907E976948DD8F353A8810357950"   
  )
    .then((response) => response.json())
    .then((data) => {
      let custData = "";
      data.Kunden.map((curValue) =>{
        custData += `
        
        <div class="main">
        <h2>${curValue.KundenNr}</h2>

        <div class="form-group">
          <h2>Company Name1</h2>
          <h2>Company Name2</h2>
          <section class="sect-details">
            <i class="fa-solid fa-location-dot" style="font-size: 3rem;
            margin: 3px 5%;
            color: #648bc7;"></i>
            <p>
              Kappenberger Damm 258<br />
              48163 Münster/Westf.<br />
              +34534534543534<br />
              info@gmail.com
            </p>
          </section>

          <div class="contact-details">
            <p>KundenNr</p>
            <button class="trigger">Kontakte</button>
          </div>
        </div>
      </div>
        
        
        ` 
      })
    })
     

