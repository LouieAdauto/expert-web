'use client'
import React, { useState } from 'react';
import styles from './styles.module.css';

interface TermSection {
  id: string;
  title: string;
  content: string;
}

const TermsAndConditions: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const termSections: TermSection[] = [
    {
      id: 'introduction',
      title: '1. Introducción y Aceptación',
      content: 'Bienvenido a Expert. Al acceder, descargar o utilizar nuestra aplicación móvil, usted acepta cumplir y estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.'
    },
    {
      id: 'eligibility',
      title: '2. Elegibilidad',
      content: 'Para utilizar Expert, debe tener al menos 13 años de edad. Para usuarios menores de 18 años, se requiere el consentimiento de un padre o tutor legal. Al crear una cuenta, declara y garantiza que cumple con estos requisitos de edad y que toda la información proporcionada es precisa y veraz.'
    },
    {
      id: 'account',
      title: '3. Creación y Seguridad de la Cuenta',
      content: 'Es responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran bajo su cuenta. No debe compartir sus credenciales de acceso con terceros. Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos o que se utilicen para actividades fraudulentas o ilegales.'
    },
    {
      id: 'privacy',
      title: '4. Privacidad y Protección de Datos',
      content: 'Su privacidad es importante para nosotros. Nuestra Política de Privacidad describe cómo recopilamos, usamos y compartimos su información personal. Al utilizar Expert, usted consiente nuestra recopilación y uso de datos según lo descrito en dicha política. Podemos compartir información con terceros en cumplimiento de leyes aplicables o para proteger nuestros derechos y la seguridad de nuestros usuarios.'
    },
    {
      id: 'content',
      title: '5. Contenido del Usuario',
      content: 'Usted conserva los derechos de propiedad intelectual del contenido que publica en Expert. Sin embargo, al publicar contenido, nos otorga una licencia mundial, no exclusiva, libre de regalías para usar, modificar, reproducir y distribuir dicho contenido en conexión con la operación y promoción de nuestros servicios. Es responsable de todo el contenido que publique y debe asegurarse de que no infringe derechos de terceros ni leyes aplicables.'
    },
    {
      id: 'conduct',
      title: '6. Conducta Aceptable',
      content: 'Al utilizar Expert, usted se compromete a: (a) no publicar contenido ofensivo, difamatorio, obsceno o ilegal; (b) no acosar, intimidar o amenazar a otros usuarios; (c) no utilizar la aplicación para actividades fraudulentas o no autorizadas; (d) no intentar acceder a cuentas, sistemas o datos no autorizados; (e) no utilizar bots, scripts o métodos automatizados para interactuar con la plataforma sin autorización.'
    },
    {
      id: 'intellectual',
      title: '7. Propiedad Intelectual',
      content: 'Expert y todo su contenido, características y funcionalidades (incluyendo pero no limitado a logotipos, marcas registradas, diseño de interfaz y código) son propiedad de nuestra empresa o de nuestros licenciantes y están protegidos por leyes de derechos de autor y propiedad intelectual. No está permitida la reproducción, distribución o creación de obras derivadas sin nuestro consentimiento expreso por escrito.'
    },
    {
      id: 'termination',
      title: '8. Terminación',
      content: 'Podemos suspender o terminar su acceso a Expert en cualquier momento, con o sin causa, con o sin previo aviso. Usted puede cerrar su cuenta en cualquier momento a través de la configuración de la aplicación. Ciertas disposiciones de estos términos continuarán vigentes después de la terminación, incluidas las relacionadas con propiedad intelectual, limitación de responsabilidad y arbitraje.'
    },
    {
      id: 'liability',
      title: '9. Limitación de Responsabilidad',
      content: 'Expert se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio sea ininterrumpido, seguro o libre de errores. En la medida máxima permitida por la ley, no seremos responsables por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestros servicios.'
    },
    {
      id: 'modifications',
      title: '10. Modificaciones de los Términos',
      content: 'Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Notificaremos cambios significativos a través de la aplicación o por correo electrónico. El uso continuado de Expert después de dichas modificaciones constituye su aceptación de los nuevos términos. Se recomienda revisar periódicamente esta sección.'
    },
    {
      id: 'jurisdiction',
      title: '11. Ley Aplicable y Resolución de Disputas',
      content: 'Estos términos se regirán por las leyes del país donde nuestra empresa tiene su sede principal. Cualquier disputa relacionada con estos términos o con el uso de Expert se resolverá mediante arbitraje vinculante, excepto que ambas partes puedan buscar medidas cautelares en tribunales competentes para prevenir daños irreparables.'
    },
    {
      id: 'contact',
      title: '12. Contacto',
      content: 'Para preguntas sobre estos Términos y Condiciones, puede contactarnos a: legal@Expertapp.com. Dirección: Calle Tecnológica 123, Ciudad Digital, CP 28080. Número de atención al usuario: +34 900 123 456 (disponible de lunes a viernes de 9:00 a 18:00).'
    }
  ];

  const handleAccept = () => {
    setAccepted(true);
    // En una implementación real, aquí se enviaría la aceptación al backend
    console.log('Términos y condiciones aceptados');
  };

  const toggleSection = (id: string) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.appName}>expert</h1>
        <h4 className={styles.title}>Términos y Condiciones de Uso</h4>
        <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
      </header>

      <div className={styles.alert}>
        <div className={styles.alertIcon}>ℹ️</div>
        <p>Por favor, lea atentamente estos términos antes de utilizar Expert. Su uso continuado de la aplicación constituye la aceptación de estos términos.</p>
      </div>

      <div className={styles.tocContainer}>
        <h2 className={styles.tocTitle}>Tabla de Contenidos</h2>
        <ul className={styles.tocList}>
          {termSections.map((section) => (
            <li key={section.id} className={styles.tocItem}>
              <button 
                className={styles.tocLink}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.termsContent}>
        {termSections.map((section) => (
          <div key={section.id} id={section.id} className={styles.termSection}>
            <h2 
              className={styles.sectionTitle}
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
              <span className={styles.toggleIcon}>
                {showDetails === section.id ? '−' : '+'}
              </span>
            </h2>
            <div className={`${styles.sectionContent} ${showDetails === section.id ? styles.expanded : ''}`}>
              <p>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Expert. Todos los derechos reservados.</p>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Política de Privacidad</a>
          <a href="/cookies">Política de Cookies</a>
          <a href="/community-guidelines">Normas de la Comunidad</a>
          <a href="/help">Centro de Ayuda</a>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;