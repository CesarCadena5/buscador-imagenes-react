import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [fotos, setFotos] = useState([]);
  console.log(fotos);
  const open = (url) => window.open(url);
  const submit = async ({search}) => {
    //llamar a API
    const URL = `https://api.unsplash.com/search/photos?per_page=20&query=${search}`;
    const response = await fetch(URL, { 
      headers: {
        'Authorization' : 'Client-ID 03ZSBI5E4eFPA_NyRe_jHdCMLl8rRYRgwMohLbaaGMI'
      } 
    });

    const data = await response.json();
    setFotos(data.results);
  }

  return(
    <div>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit={submit}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {fotos.map(foto => 
            <article key={foto.id} onClick={() => open(foto.links.html)}>
              <img src={foto.urls.regular} alt='foto' />
              <p>{[foto.description, foto.alt_description].join(' - ')}</p>
            </article>)}
        </div>
      </div>
    </div>
  );
};

export default App;
