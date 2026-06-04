import { useState } from "react";

const C = {
  bg:        '#F7F8FA',
  inputE:    { fill: '#D5E0EC', border: '#7A9BBF', header: '#E8EDF2' },
  inputL:    { fill: '#C5D5E8', border: '#7A9BBF', header: '#E2EBF5' },
  sharedIQ:  { fill: '#D4EBD0', border: '#4E9A44', header: '#EBF3E8' },
  sharedQD:  { fill: '#E0D4EB', border: '#7A55A0', header: '#F0EBF5' },
  sentinel:  { fill: '#C8DDF4', border: '#4A80C4', header: '#E8F0F8' },
  estat:     { fill: '#C8EAC0', border: '#4E9A44' },
  outS:      { fill: '#B8D8F0', border: '#3A68B0', header: '#D0DEF0' },
  outF:      { fill: '#C9DAF5', border: '#3A68B0', header: '#EAF0FA' },
  orch:      { fill: '#B0CCEC', border: '#4A80C4' },
  feedback:  { fill: '#FFF8E8', border: '#E8A020', header: '#FDECC8', text: '#7A4A00' },
  badgeVal:  { fill: '#FFF3CD', border: '#D4A017', text: '#7A5900' },
  badgeDev:  { fill: '#FFE8E8', border: '#CC4444', text: '#882222' },
  badgeProx: { fill: '#F0E8F8', border: '#7A55A0', text: '#4A2070' },
  text:      '#1A2533',
  textMid:   '#555',
  divider:   '#CCCCCC',
};

const INIT = {
  title: 'Equipo Sentinel — Flujo de agentes e interacción con Inception Loop',
  pipeline: 'Pipeline Sentinel — specs → estáticas → plan / matriz → ejecución coordinada → ejecución → reporte final',
  feedbackLabel: 'Feedback a Inception / Dev',
  feedbackSub: 'Issues, mejoras y hallazgos → ciclo siguiente',

  entradaTemprana: {
    label: 'Entradas — Etapa temprana de Inception',
    nodes: [
      { title: 'PRD v0',                  sub: 'Pain points + casos de uso' },
      { title: 'Proto / Specs iniciales', sub: 'Flujo + pantallas borrador' },
      { title: 'Diagramas BPMN / flujo',  sub: 'Proceso de negocio' },
    ],
  },
  zonaIQ: {
    label: 'Zona compartida — Inception ↔ Sentinel  |  Pruebas estáticas',
    nodes: [
      { title: 'Revisión\nspecs y HUs',   sub: 'Ambigüedades / gaps' },
      { title: 'Consistencia\nfuncional', sub: 'Flujo vs criterios aceptación' },
      { title: 'Feedback a\nInception',   sub: 'Issues → PRD / HUs corregidas' },
    ],
  },
  subEstaticas: {
    title: 'Subagente Estáticas',
    subtitle: 'Análisis specs / HUs',
    skills: [
      { label: 'pruebas-estaticas',      dev: false },
      { label: 'congruencia-hu-prd',     dev: true  },
      { label: 'validar-versiones-prd',  dev: true  },
    ],
  },
  entradaFinal: {
    label: 'Entradas — Etapa final de Inception',
    nodes: [
      { title: 'PRD + HUs Gherkin',     sub: 'Criterios de aceptación' },
      { title: 'OpenAPI / contrato',     sub: 'Request/response definido' },
      { title: 'Diagrama de secuencia',  sub: 'Interacciones entre actores' },
      { title: 'Casos de uso UML',       sub: 'Actores y relaciones' },
    ],
  },
  orquestador: {
    title: 'Orquestador QA',
    subtitle: 'crear-proyecto  |  Planifica y delega plan de pruebas',
  },
  subagentes: [
    {
      title: 'Subagente\nFunctional Test',
      subtitle: 'Plan de pruebas + casos',
      skills: [
        { label: 'plan-de-pruebas (app)',      dev: false },
        { label: 'plan-de-pruebas (genérico)', dev: false },
        { label: 'test-funcional-desa',        dev: true  },
      ],
    },
    {
      title: 'Subagente\nEjecución',
      subtitle: 'Automatización + ejecución',
      skills: [
        { label: 'automatizar-casos', dev: false },
        { label: 'ejecutar-casos',    dev: false },
        { label: 'generar-matriz',    dev: false },
        { label: 'subir-casos-qase',  dev: false },
      ],
    },
    {
      title: 'Subagente\nAPI Testing',
      subtitle: 'Contratos OpenAPI',
      skills: [{ label: 'api-testing', dev: false }],
    },
    {
      title: 'Subagente\nExploratorio',
      subtitle: 'Casos edge / sesiones',
      skills: [{ label: 'pruebas-exploratorias', dev: false }],
    },
    {
      title: 'Subagente\nRegresión',
      subtitle: 'Pruebas de regresión',
      skills: [],
    },
  ],
  outputsSentinel: {
    label: 'Outputs Sentinel QA',
    nodes: [
      { title: 'Reporte\nPruebas Estáticas', sub: 'Hallazgos / gaps' },
      { title: 'Plan de Prueba',             sub: 'Scope + prioridad + casos' },
      { title: 'Matriz de Pruebas',          sub: 'Cobertura funcional' },
      { title: 'Reporte QA\npreliminar',     sub: 'Estado + métricas iniciales' },
    ],
  },
  zonaQD: {
    label: 'Zona compartida — Sentinel ↔ Desarrollo  |  Ejecución coordinada',
    nodes: [
      { title: 'Revisión\nde casos',    sub: 'Dev + QA revisan cobertura' },
      { title: 'Ambientes\ny datos',    sub: 'Setup entorno de pruebas' },
      { title: 'Validación\nOpenAPI',   sub: 'Request/response esperado' },
      { title: 'Ejecución\nasistida',   sub: 'Dev presente en pruebas críticas' },
      { title: 'Defectos\ny retesteo',  sub: 'Fix → retest loop' },
    ],
  },
  zonaSentinel: {
    label: 'Zona Sentinel — Ejecuciones',
    nodes: [
      { title: 'Ejecución\nfuncional',   sub: 'Casos Given/When/Then' },
      { title: 'Ejecución\nAPI Testing', sub: 'Scripts Postman / OpenAPI' },
      { title: 'Testing\nexploratorio',  sub: 'Sesiones heurísticas' },
      { title: 'Evidencia\ny logs',      sub: 'Capturas + resultados' },
    ],
  },
  outputsFinales: {
    label: 'Outputs finales',
    nodes: [
      { title: 'Matriz de pruebas\nejecutadas', sub: 'Estado + cobertura' },
      { title: 'Reporte QA\nfinal',             sub: 'Métricas + defectos' },
      { title: 'Casos\nevidenciados',           sub: 'Logs + capturas' },
    ],
  },
};

// ── inline editable text ──────────────────────────────────────
function ET({ value, onChange, style, multiline }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(value);
  const commit = () => { onChange(draft); setEditing(false); };
  const base = { cursor: 'pointer', borderRadius: 3, padding: '1px 2px',
                 whiteSpace: 'pre-wrap', ...style };
  if (editing) {
    const inputStyle = { ...base, background: '#fff', border: '1px solid #4A80C4',
                         outline: 'none', width: '100%', fontSize: 'inherit',
                         color: 'inherit', textAlign: 'inherit', fontFamily: 'inherit' };
    return multiline
      ? <textarea autoFocus value={draft} rows={2}
          onChange={e => setDraft(e.target.value)} onBlur={commit}
          style={{ ...inputStyle, resize: 'none' }} />
      : <input autoFocus value={draft}
          onChange={e => setDraft(e.target.value)} onBlur={commit}
          onKeyDown={e => e.key === 'Enter' && commit()} style={inputStyle} />;
  }
  return (
    <span style={base} title="Click para editar"
      onClick={() => { setDraft(value); setEditing(true); }}>
      {value || <em style={{ color: '#aaa' }}>...</em>}
    </span>
  );
}

// ── section ───────────────────────────────────────────────────
function Section({ label, onLabelChange, borderColor, headerColor, fillColor, children }) {
  return (
    <div style={{ border: `1.5px solid ${borderColor}`, borderRadius: 8,
                  background: fillColor, overflow: 'hidden' }}>
      <div style={{ background: headerColor, padding: '5px 12px',
                    borderBottom: `1px solid ${borderColor}` }}>
        <ET value={label} onChange={onLabelChange}
          style={{ fontWeight: 700, fontSize: 13, color: C.text }} />
      </div>
      <div style={{ padding: '10px 10px 8px' }}>{children}</div>
    </div>
  );
}

// ── simple node card ──────────────────────────────────────────
function NodeCard({ title, sub, onTitleChange, onSubChange, borderColor, fillColor, onDelete, showDelete }) {
  return (
    <div style={{ flex: 1, border: `1.2px solid ${borderColor}`, borderRadius: 6,
                  background: fillColor, padding: '6px 8px', minWidth: 0, position: 'relative' }}>
      <ET value={title} onChange={onTitleChange}
        style={{ fontWeight: 700, fontSize: 11, color: C.text,
                 display: 'block', textAlign: 'center', whiteSpace: 'pre-wrap' }} />
      <ET value={sub} onChange={onSubChange}
        style={{ fontSize: 10, color: C.textMid, display: 'block',
                 textAlign: 'center', fontStyle: 'italic', marginTop: 2 }} />
      {showDelete && (
        <button onClick={onDelete}
          style={{ position: 'absolute', top: 2, right: 3, fontSize: 9,
                   border: 'none', background: 'none', cursor: 'pointer', color: '#ccc' }}>✕</button>
      )}
    </div>
  );
}

function NodeRow({ nodes, onNodeChange, borderColor, fillColor, onAddNode, onDeleteNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
      {nodes.map((n, i) => (
        <NodeCard key={i} title={n.title} sub={n.sub}
          onTitleChange={v => onNodeChange(i, { ...n, title: v })}
          onSubChange={v => onNodeChange(i, { ...n, sub: v })}
          borderColor={borderColor} fillColor={fillColor}
          showDelete={nodes.length > 1} onDelete={() => onDeleteNode(i)} />
      ))}
      <button onClick={onAddNode}
        style={{ flexShrink: 0, alignSelf: 'center', fontSize: 11,
                 border: `1px dashed ${borderColor}`, borderRadius: 6,
                 background: 'transparent', cursor: 'pointer',
                 color: borderColor, padding: '6px 10px' }}>+</button>
    </div>
  );
}

// ── skill chip ────────────────────────────────────────────────
function SkillChip({ label, dev, onLabelChange, onToggleDev, onDelete, borderColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4,
                  border: `1px solid ${dev ? C.badgeDev.border : borderColor}`,
                  borderRadius: 4, background: dev ? C.badgeDev.fill : '#fff',
                  padding: '2px 6px' }}>
      <ET value={label} onChange={onLabelChange}
        style={{ fontSize: 11, flex: 1,
                 color: dev ? C.badgeDev.text : C.text,
                 fontWeight: dev ? 700 : 400 }} />
      <button onClick={onToggleDev} title={dev ? 'Marcar validado' : 'Marcar en desarrollo'}
        style={{ fontSize: 9, border: 'none', background: 'none', cursor: 'pointer',
                 color: dev ? C.badgeDev.text : '#aaa', padding: '0 2px' }}>
        {dev ? '🔧' : '✓'}
      </button>
      <button onClick={onDelete}
        style={{ fontSize: 9, border: 'none', background: 'none',
                 cursor: 'pointer', color: '#ccc', padding: '0 2px' }}>✕</button>
    </div>
  );
}

// ── subagent card ─────────────────────────────────────────────
function SubagentCard({ data, onChange, borderColor, fillColor, shared }) {
  const addSkill = () => onChange({ ...data, skills: [...data.skills, { label: 'nuevo-skill', dev: false }] });
  return (
    <div style={{ border: shared ? `2px dashed ${C.sharedIQ.border}` : `1.5px solid ${borderColor}`,
                  borderRadius: 8, background: fillColor, padding: '8px 10px',
                  flex: 1, minWidth: 0,
                  boxShadow: shared ? `0 0 0 3px ${C.sharedIQ.fill}` : 'none' }}>
      {shared && (
        <div style={{ fontSize: 9, color: C.sharedIQ.border, fontStyle: 'italic',
                      marginBottom: 4, textAlign: 'center' }}>◆ zona compartida</div>
      )}
      <ET value={data.title} onChange={v => onChange({ ...data, title: v })} multiline
        style={{ fontWeight: 700, fontSize: 12, color: C.text,
                 display: 'block', textAlign: 'center', whiteSpace: 'pre-wrap' }} />
      <ET value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })}
        style={{ fontSize: 10, color: C.textMid, display: 'block',
                 textAlign: 'center', fontStyle: 'italic', marginTop: 2 }} />

      <hr style={{ border: 'none', borderTop: `1px solid ${C.divider}`, margin: '6px 0' }} />

      {/* próximo — top */}
      <div style={{ textAlign: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.badgeProx.text,
                       background: C.badgeProx.fill, border: `1px solid ${C.badgeProx.border}`,
                       borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap' }}>
          ⚑ Próximo a implementar
        </span>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.divider}`, margin: '5px 0' }} />

      {/* skills header */}
      <div style={{ textAlign: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: C.badgeVal.text,
                       background: C.badgeVal.fill, border: `1px solid ${C.badgeVal.border}`,
                       borderRadius: 4, padding: '2px 8px',
                       whiteSpace: 'nowrap',        /* ← fix wrap */
                       display: 'inline-block' }}>
          ⚗ Skills workspace-QA
        </span>
      </div>

      {data.skills.length === 0 && (
        <div style={{ fontSize: 10, color: '#aaa', textAlign: 'center',
                      fontStyle: 'italic', marginBottom: 4 }}>sin skills aún</div>
      )}
      {data.skills.map((sk, i) => (
        <SkillChip key={i} label={sk.label} dev={sk.dev} borderColor={borderColor}
          onLabelChange={v => { const s = [...data.skills]; s[i] = { ...s[i], label: v }; onChange({ ...data, skills: s }); }}
          onToggleDev={() => { const s = [...data.skills]; s[i] = { ...s[i], dev: !s[i].dev }; onChange({ ...data, skills: s }); }}
          onDelete={() => onChange({ ...data, skills: data.skills.filter((_, j) => j !== i) })}
        />
      ))}
      <button onClick={addSkill}
        style={{ width: '100%', marginTop: 2, fontSize: 10,
                 border: `1px dashed ${borderColor}`, borderRadius: 4,
                 background: 'transparent', cursor: 'pointer',
                 color: borderColor, padding: '2px 0' }}>+ skill</button>
    </div>
  );
}

function Arrow({ double, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center',
                  padding: '3px 0', color: color || '#888', fontSize: 18 }}>
      {double ? '↕' : '↓'}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
export default function SentinelDiagram() {
  const [d, setD] = useState(INIT);

  const upd = (key, val) => setD(prev => ({ ...prev, [key]: val }));
  const updNested = (key, subkey, val) => setD(prev => ({
    ...prev, [key]: { ...prev[key], [subkey]: val }
  }));
  const updNode = (key, i, val) => setD(prev => {
    const nodes = [...prev[key].nodes]; nodes[i] = val;
    return { ...prev, [key]: { ...prev[key], nodes } };
  });
  const addNode = (key) => setD(prev => ({
    ...prev, [key]: { ...prev[key], nodes: [...prev[key].nodes, { title: 'nuevo nodo', sub: 'descripción' }] }
  }));
  const delNode = (key, i) => setD(prev => ({
    ...prev, [key]: { ...prev[key], nodes: prev[key].nodes.filter((_, j) => j !== i) }
  }));
  const updSubagent = (i, val) => setD(prev => {
    const s = [...prev.subagentes]; s[i] = val;
    return { ...prev, subagentes: s };
  });
  const addSubagent = () => setD(prev => ({
    ...prev, subagentes: [...prev.subagentes,
      { title: 'Nuevo\nSubagente', subtitle: 'descripción', skills: [] }]
  }));
  const delSubagent = (i) => setD(prev => ({
    ...prev, subagentes: prev.subagentes.filter((_, j) => j !== i)
  }));

  // ── main content (left column) ──
  const mainContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>

      {/* title */}
      <div style={{ textAlign: 'center', padding: '4px 0 8px' }}>
        <ET value={d.title} onChange={v => upd('title', v)}
          style={{ fontSize: 16, fontWeight: 800, color: C.text }} />
      </div>

      {/* ROW 1 — temprana */}
      <Section label={d.entradaTemprana.label}
        onLabelChange={v => updNested('entradaTemprana', 'label', v)}
        borderColor={C.inputE.border} headerColor={C.inputE.header} fillColor='#EEF2F7'>
        <NodeRow nodes={d.entradaTemprana.nodes}
          onNodeChange={(i, v) => updNode('entradaTemprana', i, v)}
          borderColor={C.inputE.border} fillColor={C.inputE.fill}
          onAddNode={() => addNode('entradaTemprana')}
          onDeleteNode={i => delNode('entradaTemprana', i)} />
      </Section>

      <Arrow double color={C.sharedIQ.border} />

      {/* ROW 2 — zona IQ */}
      <Section label={d.zonaIQ.label}
        onLabelChange={v => updNested('zonaIQ', 'label', v)}
        borderColor={C.sharedIQ.border} headerColor={C.sharedIQ.header} fillColor='#EBF6E7'>
        <NodeRow nodes={d.zonaIQ.nodes}
          onNodeChange={(i, v) => updNode('zonaIQ', i, v)}
          borderColor={C.sharedIQ.border} fillColor={C.sharedIQ.fill}
          onAddNode={() => addNode('zonaIQ')}
          onDeleteNode={i => delNode('zonaIQ', i)} />
      </Section>

      <Arrow double color={C.sharedIQ.border} />

      {/* subagente estáticas */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '42%' }}>
          <SubagentCard data={d.subEstaticas}
            onChange={v => upd('subEstaticas', v)}
            borderColor={C.estat.border} fillColor={C.estat.fill} shared />
        </div>
      </div>

      <Arrow double color={C.sharedIQ.border} />

      {/* ROW 4 — final */}
      <Section label={d.entradaFinal.label}
        onLabelChange={v => updNested('entradaFinal', 'label', v)}
        borderColor={C.inputL.border} headerColor={C.inputL.header} fillColor='#E2EBF5'>
        <NodeRow nodes={d.entradaFinal.nodes}
          onNodeChange={(i, v) => updNode('entradaFinal', i, v)}
          borderColor={C.inputL.border} fillColor={C.inputL.fill}
          onAddNode={() => addNode('entradaFinal')}
          onDeleteNode={i => delNode('entradaFinal', i)} />
      </Section>

      <Arrow />

      {/* ROW 5 — Sentinel agentes */}
      <Section label="Sentinel QA — Agentes" onLabelChange={() => {}}
        borderColor={C.sentinel.border} headerColor={C.sentinel.header} fillColor='#EAF1FB'>

        {/* orquestador */}
        <div style={{ border: `1.5px solid ${C.orch.border}`, borderRadius: 8,
                      background: C.orch.fill, padding: '8px 14px', marginBottom: 10,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <div>
            <ET value={d.orquestador.title} onChange={v => updNested('orquestador','title',v)}
              style={{ fontWeight: 800, fontSize: 13, color: C.text }} />
            <ET value={d.orquestador.subtitle} onChange={v => updNested('orquestador','subtitle',v)}
              style={{ fontSize: 10, color: C.textMid, fontStyle: 'italic', marginTop: 2, display: 'block' }} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.badgeProx.text,
                         background: C.badgeProx.fill, border: `1px solid ${C.badgeProx.border}`,
                         borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap' }}>
            ⚑ Próximo a implementar
          </span>
        </div>

        {/* subagentes */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {d.subagentes.map((sa, i) => (
            <div key={i} style={{ flex: '1 1 160px', minWidth: 0, position: 'relative' }}>
              <SubagentCard data={sa} onChange={v => updSubagent(i, v)}
                borderColor={C.sentinel.border} fillColor={C.sentinel.fill} />
              {d.subagentes.length > 1 && (
                <button onClick={() => delSubagent(i)}
                  style={{ position: 'absolute', top: 4, right: 4, fontSize: 10,
                           border: 'none', background: 'none', cursor: 'pointer', color: '#bbb' }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={addSubagent}
            style={{ flexShrink: 0, alignSelf: 'center', fontSize: 11,
                     border: `1px dashed ${C.sentinel.border}`, borderRadius: 6,
                     background: 'transparent', cursor: 'pointer',
                     color: C.sentinel.border, padding: '10px 8px' }}>+</button>
        </div>
      </Section>

      <Arrow />

      {/* outputs sentinel */}
      <Section label={d.outputsSentinel.label}
        onLabelChange={v => updNested('outputsSentinel','label',v)}
        borderColor={C.outS.border} headerColor={C.outS.header} fillColor='#E4EDF8'>
        <NodeRow nodes={d.outputsSentinel.nodes}
          onNodeChange={(i,v) => updNode('outputsSentinel',i,v)}
          borderColor={C.outS.border} fillColor={C.outS.fill}
          onAddNode={() => addNode('outputsSentinel')}
          onDeleteNode={i => delNode('outputsSentinel',i)} />
      </Section>

      <Arrow />

      {/* zona QD */}
      <Section label={d.zonaQD.label}
        onLabelChange={v => updNested('zonaQD','label',v)}
        borderColor={C.sharedQD.border} headerColor={C.sharedQD.header} fillColor='#F3EEF9'>
        <NodeRow nodes={d.zonaQD.nodes}
          onNodeChange={(i,v) => updNode('zonaQD',i,v)}
          borderColor={C.sharedQD.border} fillColor={C.sharedQD.fill}
          onAddNode={() => addNode('zonaQD')}
          onDeleteNode={i => delNode('zonaQD',i)} />
      </Section>

      <Arrow />

      {/* zona sentinel ejecuciones */}
      <Section label={d.zonaSentinel.label}
        onLabelChange={v => updNested('zonaSentinel','label',v)}
        borderColor={C.sentinel.border} headerColor={C.sentinel.header} fillColor='#EAF1FB'>
        <NodeRow nodes={d.zonaSentinel.nodes}
          onNodeChange={(i,v) => updNode('zonaSentinel',i,v)}
          borderColor={C.sentinel.border} fillColor={C.sentinel.fill}
          onAddNode={() => addNode('zonaSentinel')}
          onDeleteNode={i => delNode('zonaSentinel',i)} />
      </Section>

      <Arrow />

      {/* outputs finales */}
      <Section label={d.outputsFinales.label}
        onLabelChange={v => updNested('outputsFinales','label',v)}
        borderColor={C.outF.border} headerColor={C.outF.header} fillColor='#EBF1FC'>
        <NodeRow nodes={d.outputsFinales.nodes}
          onNodeChange={(i,v) => updNode('outputsFinales',i,v)}
          borderColor={C.outF.border} fillColor={C.outF.fill}
          onAddNode={() => addNode('outputsFinales')}
          onDeleteNode={i => delNode('outputsFinales',i)} />
      </Section>

      {/* pipeline */}
      <div style={{ background: '#1E3A5F', borderRadius: 6,
                    padding: '8px 16px', textAlign: 'center', marginTop: 4 }}>
        <ET value={d.pipeline} onChange={v => upd('pipeline', v)}
          style={{ fontSize: 11.5, color: '#fff', fontWeight: 700 }} />
      </div>

      {/* legend */}
      <div style={{ padding: '8px 12px', background: '#fff',
                    borderRadius: 6, border: '1px solid #ddd' }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Referencias</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 18px' }}>
          {[
            [C.inputE.fill,    C.inputE.border,    'solid',  'Inputs etapa temprana'],
            [C.inputL.fill,    C.inputL.border,    'solid',  'Inputs etapa final'],
            [C.sharedIQ.fill,  C.sharedIQ.border,  'dashed', 'Zona compartida Inception ↔ Sentinel'],
            [C.sharedQD.fill,  C.sharedQD.border,  'dashed', 'Zona compartida Sentinel ↔ Dev'],
            [C.sentinel.fill,  C.sentinel.border,  'solid',  'Agentes Sentinel'],
            [C.badgeVal.fill,  C.badgeVal.border,  'solid',  'Skills en validación'],
            [C.badgeDev.fill,  C.badgeDev.border,  'solid',  'Skill en desarrollo 🔧'],
            [C.badgeProx.fill, C.badgeProx.border, 'solid',  'Próximo a implementar'],
            [C.feedback.fill,  C.feedback.border,  'solid',  'Feedback transversal'],
          ].map(([fill, border, ls, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 14, height: 11, borderRadius: 3, flexShrink: 0,
                            background: fill, border: `1.5px ${ls} ${border}` }} />
              <span style={{ fontSize: 10, color: C.text }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── feedback column (right, vertical, sticky) ──
  const feedbackCol = (
    <div style={{
      width: 52,
      flexShrink: 0,
      position: 'sticky',
      top: 12,
      alignSelf: 'flex-start',
      height: 'calc(100vh - 24px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        flex: 1,
        border: `2px solid ${C.feedback.border}`,
        borderRadius: 10,
        background: C.feedback.fill,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 6px',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* top arrow */}
        <div style={{ fontSize: 18, color: C.feedback.border }}>↑</div>

        {/* rotated label */}
        <div style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          flex: 1,
        }}>
          <ET value={d.feedbackLabel} onChange={v => upd('feedbackLabel', v)}
            style={{ fontWeight: 800, fontSize: 13, color: C.feedback.text,
                     letterSpacing: '0.03em' }} />
          <ET value={d.feedbackSub} onChange={v => upd('feedbackSub', v)}
            style={{ fontSize: 9.5, color: '#996600', fontStyle: 'italic' }} />
        </div>

        {/* bottom arrow */}
        <div style={{ fontSize: 18, color: C.feedback.border }}>↓</div>

        {/* dashed vertical line behind text */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          borderLeft: `2px dashed ${C.feedback.border}`,
          opacity: 0.25, zIndex: 0, transform: 'translateX(-50%)',
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
                  background: C.bg, padding: 12, minHeight: '100vh', color: C.text }}>
      <div style={{ fontSize: 10, color: '#888', textAlign: 'right',
                    marginBottom: 6, fontStyle: 'italic' }}>
        ✏️ Click en cualquier texto para editar
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {mainContent}
        {feedbackCol}
      </div>
    </div>
  );
}
