import { useState, useEffect, useRef } from "react";
import logo from "/logo.png";

const G = "#2d5a3d";
const L = "#aaa";
const B = "#efefef";

const Row = ({ item, cat }) => {
  const [open, setOpen] = useState(false);

  const handleAgendar = () => {
    const phone = "5493804867215";
    const text = cat === "depilacion"
      ? "¡Hola! Estoy interesada en el servicio de *Depilación Sistema Español*. ¿Cuándo tienen disponibilidad? ¡Gracias! 🌿"
      : `¡Hola! Estoy interesada en el servicio de *${item.name}*. ¿Cuándo tienen disponibilidad? ¡Gracias! 🌿`;
    const msg = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ borderBottom: `1px solid ${B}` }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "13px 0", gap: 16, cursor: "pointer" }}
      >
        <div style={{ flex: 1 }}>
          {item.pkg && (
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, color: G, textTransform: "uppercase", display: "block", marginBottom: 2 }}>
              Paquete
            </span>
          )}
          <div style={{ fontWeight: 300, fontSize: 14, color: "#1c1c1c", marginBottom: item.desc ? 3 : 0, lineHeight: 1.4 }}>{item.name}</div>
          {item.desc && <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: L, fontStyle: "italic", lineHeight: 1.5 }}>{item.desc}</div>}
          {item.time && <div style={{ fontSize: 10, color: "#ccc", marginTop: 2 }}>{item.time}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#1c1c1c", whiteSpace: "nowrap" }}>{item.price}</div>
          <div style={{ fontSize: 11, color: open ? G : L, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
        </div>
      </div>
      {open && (
        <div style={{ paddingBottom: 14, paddingTop: 2 }}>
          <button
            onClick={handleAgendar}
            style={{ display: "flex", alignItems: "center", gap: 8, background: G, color: "white", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" }}
          >
            <span>💬</span> Agendá tu turno
          </button>
        </div>
      )}
    </div>
  );
};

const Sub = ({ label, items, cat }) => (
  <div>
    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontStyle: "italic", color: G, letterSpacing: 1, margin: "24px 0 10px", paddingBottom: 8, borderBottom: "1px solid #f0f5f2" }}>{label}</div>
    {items.map((item, i) => <Row key={i} item={item} cat={cat} />)}
  </div>
);

const CatHeader = ({ num, title, italic, desc }) => (
  <div style={{ padding: "52px 0 28px", borderBottom: `1px solid ${B}`, marginBottom: 28 }}>
    <div style={{ fontSize: 10, color: L, letterSpacing: 3, marginBottom: 6 }}>{num}</div>
    <div style={{ fontFamily: "Georgia,serif", fontSize: 44, fontWeight: 300, lineHeight: 1.05, color: "#1c1c1c" }}>
      {title}<br /><em style={{ color: G }}>{italic}</em>
    </div>
    <div style={{ fontSize: 11, color: L, letterSpacing: .5, marginTop: 6 }}>{desc}</div>
  </div>
);

const GSwitch = ({ gender, setGender }) => (
  <div style={{ display: "flex", background: "#f2f2f2", borderRadius: 8, padding: 3, marginBottom: 20, maxWidth: 180 }}>
    {["mujer", "hombre"].map(g => (
      <div key={g} onClick={() => setGender(g)} style={{ flex: 1, textAlign: "center", padding: "9px 10px", fontSize: 10, fontWeight: gender === g ? 600 : 400, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", borderRadius: 6, color: gender === g ? G : L, background: gender === g ? "white" : "transparent", boxShadow: gender === g ? "0 1px 6px rgba(0,0,0,.07)" : "none", transition: "all .2s" }}>
        {g.charAt(0).toUpperCase() + g.slice(1)}
      </div>
    ))}
  </div>
);

const Dot = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "8px 24px", opacity: .2 }}>
    <div style={{ flex: 1, height: 1, background: B }} />
    <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: L, letterSpacing: 3 }}>· · ·</span>
    <div style={{ flex: 1, height: 1, background: B }} />
  </div>
);

export default function App() {
  const [gender, setGender] = useState("mujer");
  const [activeNav, setActiveNav] = useState("cejas");
  const sectionRefs = useRef({});

  const navItems = [
    { id: "cejas", label: "Cejas" },
    { id: "depilacion", label: "Depilación" },
    { id: "faciales", label: "Faciales" },
    { id: "manicuria", label: "Manicuría" },
    { id: "masajes", label: "Masajes" },
    { id: "nutricion", label: "Nutrición" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const s = { padding: "0 20px", maxWidth: 600, margin: "0 auto" };

  return (
    <div style={{ fontFamily: "sans-serif", background: "white", color: "#1c1c1c" }}>

      {/* HERO */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px 60px", borderBottom: `1px solid ${B}` }}>
        <img src={logo} alt="Salon 23" style={{ width: "min(300px, 80vw)", height: "auto", objectFit: "contain" }} />
        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: L, fontStyle: "italic", marginTop: 16, letterSpacing: 1 }}>
          Estética de cuidado integral · La Rioja
        </div>
      </div>

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${B}` }}>
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: "0 12px" }}>
          {navItems.map(n => (
            <div key={n.id} onClick={() => scrollTo(n.id)} style={{ flexShrink: 0, padding: "11px 12px", fontSize: 10, fontWeight: activeNav === n.id ? 600 : 400, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", color: activeNav === n.id ? G : L, borderBottom: activeNav === n.id ? `2px solid ${G}` : "2px solid transparent", transition: "all .2s", whiteSpace: "nowrap" }}>
              {n.label}
            </div>
          ))}
        </div>
      </div>

      {/* CEJAS */}
      <div ref={el => sectionRefs.current.cejas = el} id="cejas" style={s}>
        <CatHeader num="01" title="Cejas &" italic="Pestañas" desc="Diseño, lifting y tratamientos para tu mirada" />
        <Sub label="Cejas" items={[
          { name: "Perfilado de cejas", time: "25 min", price: "$8.000" },
          { name: "Diseño y Perfilado", time: "30 min", price: "$16.000" },
          { name: "Perfilado + Henna", time: "45 min", price: "$16.500" },
          { name: "Tinte de cejas", time: "30 min", price: "$18.000" },
          { name: "Laminado de cejas", time: "30 min", price: "$14.000" },
          { name: "Laminado + Perfilado", time: "45 min", price: "$16.000" },
          { name: "Laminado + Tinte", time: "45 min", price: "$18.000" },
        ]} />
        <Sub label="Pestañas" items={[
          { name: "Lifting de pestañas", time: "1 hr", price: "$20.000" },
          { name: "Lifting + Tinte", time: "1 hr", price: "$25.000" },
          { name: "Lifting + Perfilado", time: "1 hr", price: "$19.500" },
          { name: "Lifting + Perfilado + Hena", time: "1 hr 30 min", price: "$26.500" },
          { name: "Lifting con Tinte + Nutrición", time: "40 min", price: "$22.000" },
          { name: "Lifting con Tinte + Perfilado", time: "1 hr 30 min", price: "$22.000" },
          { name: "Lifting con Tinte + Nutrición + Perfilado", time: "1 hr", price: "$28.000" },
          { name: "Lifting con Tinte + Nutrición + Perfilado + Hena", time: "2 hrs", price: "$35.500" },
          { name: "Lifting con Tinte + Perfilado + Laminado / Hena", time: "2 hrs", price: "$35.500" },
          { name: "Lifting con Tinte + Perfilado + Laminado + Hena", time: "2 hrs", price: "$37.000" },
        ]} />
        <Sub label="Combos Mirada" items={[
          { name: "Combo Mirada Natural", pkg: true, price: "$20.000" },
          { name: "Combo Mirada Definida", pkg: true, price: "$22.000" },
          { name: "Combo Mirada Perfecta", pkg: true, price: "$28.000" },
          { name: "Combo Mirada Completa", pkg: true, price: "$45.000" },
        ]} />
      </div>

      <Dot />

      {/* DEPILACIÓN */}
      <div ref={el => sectionRefs.current.depilacion = el} id="depilacion" style={s}>
        <CatHeader num="02" title="Depilación" italic="Sistema Español" desc="Técnica profesional de cera para resultados duraderos" />
        <GSwitch gender={gender} setGender={setGender} />
        {gender === "mujer" ? <>
          <Sub label="Zonas" cat="depilacion" items={[
            { name: "Abdomen", time: "20 min", price: "$14.000" },
            { name: "Axilas", time: "15 min", price: "$12.000" },
            { name: "Bozo", time: "20 min", price: "$8.000" },
            { name: "Brazos", time: "25 min", price: "$16.000" },
            { name: "Glúteos", time: "20 min", price: "$20.000" },
            { name: "Linea Alba", time: "25 min", price: "$10.000" },
            { name: "Manos", time: "20 min", price: "$10.000" },
            { name: "Media pierna", time: "25 min", price: "$12.000" },
            { name: "Medio Brazo", time: "20 min", price: "$10.000" },
            { name: "Nuca", time: "20 min", price: "$10.000" },
            { name: "Pecho", time: "25 min", price: "$14.000" },
            { name: "Pies", time: "20 min", price: "$10.000" },
            { name: "Piernas Completas", time: "35 min", price: "$22.000" },
            { name: "Rostro Completo", time: "35 min", price: "$15.000" },
            { name: "Espalda Completa", time: "35 min", price: "$38.000" },
          ]} />
          <Sub label="Paquetes" cat="depilacion" items={[
            { name: "Esencial", pkg: true, desc: "Mantenimiento práctico para una piel prolija todo el mes", price: "$25.000" },
            { name: "Completo", pkg: true, desc: "La opción más elegida para una piel suave y uniforme", price: "$45.000" },
            { name: "Full Body", pkg: true, desc: "Cobertura completa en una sola sesión", price: "$55.000" },
          ]} />
        </> : <>
          <Sub label="Zonas" cat="depilacion" items={[
            { name: "Abdomen", time: "15 min", price: "$20.000" },
            { name: "Axilas", time: "35 min", price: "$15.000" },
            { name: "Brazos", time: "45 min", price: "$19.000" },
            { name: "Cavado Simples", time: "25 min", price: "$15.000" },
            { name: "Cavado Profundo", time: "25 min", price: "$18.000" },
            { name: "Espalda Baja", time: "20 min", price: "$15.000" },
            { name: "Espalda Completa", time: "30 min", price: "$20.000" },
            { name: "Glúteos", time: "35 min", price: "$26.000" },
            { name: "Linea Alba", time: "25 min", price: "$22.000" },
            { name: "Manos", time: "20 min", price: "$15.000" },
            { name: "Nuca", time: "20 min", price: "$12.000" },
            { name: "Pecho", time: "25 min", price: "$22.000" },
            { name: "Piernas Completas", time: "45 min", price: "$28.000" },
            { name: "Pies", time: "20 min", price: "$15.000" },
            { name: "Rostro Completo", time: "35 min", price: "$15.000" },
          ]} />
          <Sub label="Paquetes" cat="depilacion" items={[
            { name: "Básico", pkg: true, desc: "Mantenimiento esencial para una imagen prolija", price: "$30.000" },
            { name: "Torso Completo", pkg: true, desc: "Ideal para un aspecto limpio y cuidado", price: "$45.000" },
            { name: "Full Masculino", pkg: true, desc: "Depilación completa para una imagen prolija y segura", price: "$65.000" },
          ]} />
        </>}
      </div>

      <Dot />

      {/* FACIALES */}
      <div ref={el => sectionRefs.current.faciales = el} id="faciales" style={s}>
        <CatHeader num="03" title="Faciales" italic="Profesionales" desc="Adaptados según tu tipo de piel y necesidades específicas" />
        <Sub label="Tratamientos" items={[
          { name: "Fresh Skin", desc: "Limpieza profunda + hidratación. Ideal para mejorar la textura, aportar luminosidad y devolver frescura a la piel.", price: "$23.000" },
          { name: "Glow Facial", desc: "Dermaplaning profesional. Exfoliación avanzada que deja la piel más suave, uniforme y luminosa.", price: "$28.000" },
          { name: "Limpieza con aparatología y extracción", desc: "Tecnología + extracción manual para una piel profundamente limpia.", price: "$30.000" },
          { name: "Hidratación labial con Dermapen", desc: "Microagujas para labios más hidratados y definidos.", price: "$32.000" },
        ]} />
        <Sub label="Paquetes Pro" items={[
          { name: "Skin Detox", pkg: true, desc: "Limpieza profunda + extracción + Dermapen + activos (salicílico, niacinamida, hialurónico). Controla comedones, pápulas y pústulas.", price: "$42.000" },
          { name: "Glow Reafirmante", pkg: true, desc: "Limpieza + activos anti age + Dermapen + hidratación intensiva. Estimulación de elastina y colágeno para firmeza y textura.", price: "$45.000" },
          { name: "Full Face", pkg: true, desc: "Limpieza profunda + Dermaplaning + Dermapen + hidratación intensiva. Renovación profunda, peeling, luminosidad y regeneración.", price: "$48.000" },
        ]} />
      </div>

      <Dot />

      {/* MANICURÍA */}
      <div ref={el => sectionRefs.current.manicuria = el} id="manicuria" style={s}>
        <CatHeader num="04" title="Manicuría" italic="& Uñas" desc="Cuidado y diseño profesional de uñas" />
        <Sub label="Servicios base" items={[
          { name: "Belleza de manos", desc: "Limpieza, limado, cutículas y hidratación.", time: "35 min", price: "$14.000" },
          { name: "Esmaltado Semipermanente", desc: "Sobre la uña natural sana. Resultado duradero.", time: "35 min", price: "$15.000" },
          { name: "Extracciones - Manos", time: "25 min", price: "$12.000" },
          { name: "Capping en gel", desc: "Capa de gel sobre la uña natural para refuerzo y brillo.", time: "45 min", price: "$17.000" },
          { name: "Soft gel", desc: "Extensión con tips de gel para uñas largas y definidas.", time: "1 hr 5 min", price: "$22.000" },
        ]} />
        <Sub label="Diseño & Arte" items={[
          { name: "Nail Art Simple", desc: "Líneas, corazones, mini flores o detalles sutiles.", time: "20 min", price: "$3.000" },
          { name: "Nail Art Full", desc: "Diseños elaborados: mano alzada, combinaciones o efectos especiales.", time: "25 min", price: "$4.300" },
          { name: "Efectos Especiales", desc: "Cat eye, chrome, baby bomber, polvos, apliques.", time: "15 min", price: "$4.500" },
          { name: "Francesa - por uña", time: "15 min", price: "$2.500" },
        ]} />
        <Sub label="Retiros & Reparaciones" items={[
          { name: "Retiro Semipermanente", time: "10 min", price: "$4.500" },
          { name: "Retiro Soft gel", time: "10 min", price: "$5.500" },
          { name: "Retiro Capping", time: "10 min", price: "$5.500" },
          { name: "Reparación por uña - Capping gel", time: "15 min", price: "$3.000" },
          { name: "Reparación por uña - Soft gel", time: "10 min", price: "$3.000" },
          { name: "Reparación por uña - Semipermanente", desc: "Arreglo puntual de uñas quebradas o dañadas.", time: "15 min", price: "$2.500" },
        ]} />
      </div>

      <Dot />

      {/* MASAJES */}
      <div ref={el => sectionRefs.current.masajes = el} id="masajes" style={s}>
        <CatHeader num="05" title="Masajes &" italic="Bienestar" desc="Terapias para relajar, recuperar y rendir más" />
        <Sub label="Masajes terapéuticos" items={[
          { name: "Holístico / anti estrés (45 min)", desc: "Tratamiento integral para relajar cuerpo y mente.", time: "50 min", price: "$32.000" },
          { name: "Holístico / anti estrés (1 hora)", desc: "Tratamiento integral para relajar cuerpo y mente.", time: "1 hr 5 min", price: "$38.000" },
          { name: "Masaje Descontracturante", desc: "Trabajo profundo sobre contracturas y sobrecarga muscular.", time: "50 min", price: "$40.000" },
          { name: "Masaje Cervical / Espalda", desc: "Alivio de tensiones localizadas en cuello y espalda.", time: "35 min", price: "$28.000" },
          { name: "Deportivo", desc: "Enfocado en recuperación muscular y rendimiento.", time: "50 min", price: "$40.000" },
          { name: "Piernas cansadas", desc: "Activa la circulación y reduce la pesadez.", time: "35 min", price: "$32.000" },
        ]} />
        <Sub label="Terapia Muscular · Tomás Rodríguez, Kinesiólogo" items={[
          { name: "Sesión individual", desc: "Evaluación funcional personalizada. Masaje deportivo y terapéutico.", price: "$30.000" },
          { name: "Plan Recuperación — 2 sesiones", pkg: true, desc: "Ideal para aliviar dolor puntual y sobrecargas.", price: "$55.000" },
          { name: "Plan Rendimiento — 3 sesiones", pkg: true, desc: "Evaluación + tratamiento progresivo.", price: "$78.000" },
          { name: "Plan Alto Rendimiento — 4 sesiones", pkg: true, desc: "Seguimiento continuo + prioridad de turnos.", price: "$105.000" },
        ]} />
      </div>

      <Dot />

      {/* NUTRICIÓN */}
      <div ref={el => sectionRefs.current.nutricion = el} id="nutricion" style={s}>
        <CatHeader num="06" title="Nutrición" italic="& Salud" desc="Asesoramiento nutricional personalizado" />
        <Sub label="Consultas" items={[
          { name: "Consulta", desc: "Comprensión de objetivos y diseño de plan personalizado.", time: "45 min", price: "$25.000" },
          { name: "Bioimpedancia", desc: "Evalúa composición corporal: masa grasa, muscular e hidratación.", time: "20 min", price: "$20.000" },
          { name: "Consulta + Plan de alimentación + Bioimpedancia", desc: "Paquete completo con plan personalizado y medición corporal.", time: "2 hrs", price: "$70.000" },
        ]} />
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "40px 20px 60px", borderTop: `1px solid ${B}`, marginTop: 40 }}>
        <img src={logo} alt="Salon 23" style={{ width: 120, opacity: .4, marginBottom: 20 }} />
        <div style={{ fontSize: 11, color: "#1c1c1c", fontWeight: 500, letterSpacing: 2, marginBottom: 16 }}>SALON 23</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
            <span>📍</span><span>Benjamín de La Vega 126, La Rioja</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
            <span>📞</span><span>380 486-7215</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
            <span>📸</span><span>@salon23.estetica</span>
          </div>
        </div>
      </div>

    </div>
  );
}
