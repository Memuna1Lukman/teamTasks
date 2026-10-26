import Button from '../components/Button'

const features = [
  {
    number: '01',
    title: 'Capture the next step',
    copy: 'Turn loose ends into clear, actionable tasks in a few seconds.',
  },
  {
    number: '02',
    title: 'Keep priorities visible',
    copy: 'See what needs your attention now without digging through a busy workspace.',
  },
  {
    number: '03',
    title: 'Finish with confidence',
    copy: 'Complete work as you go and keep a simple record of your progress.',
  },
]

const testimonials = [
  {
    quote: 'Taskflow gives our team a shared sense of calm. We always know what matters next.',
    name: 'Maya Chen',
    role: 'Operations lead, Northstar',
    initials: 'MC',
    tone: 'lavender',
  },
  {
    quote: 'The simplest tool on our stack, and somehow the one we use every single day.',
    name: 'Jon Bell',
    role: 'Founder, Fieldwork',
    initials: 'JB',
    tone: 'mint',
  },
  {
    quote: 'It turns a noisy list of ideas into a clear path forward. That is a real superpower.',
    name: 'Priya Shah',
    role: 'Product designer, Looma',
    initials: 'PS',
    tone: 'peach',
  },
]

const heroTasks = [
  { label: 'Design', title: 'Polish the launch page', meta: 'Today · 3 comments', tone: 'blue' },
  { label: 'Planning', title: 'Share the campaign brief', meta: 'Tomorrow · 2 members', tone: 'violet' },
  { label: 'Complete', title: 'Set the launch date', meta: 'Done · Team approved', tone: 'green' },
]

function TestimonialCard({ testimonial }) {
  return <figure className="testimonial">
    <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>“{testimonial.quote}”</blockquote>
    <figcaption><span className={`testimonial-avatar ${testimonial.tone}`}>{testimonial.initials}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></figcaption>
  </figure>
}

export default function LandingPage({ onSignIn, onSignUp }) {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Taskflow home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>taskflow</span>
        </a>
        <div className="landing-nav-actions">
          <a className="nav-link" href="#how-it-works">How it works</a>
          <Button variant="secondary" onClick={onSignIn}>Sign in</Button>
          <Button onClick={onSignUp}>Sign up</Button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow accent-eyebrow"><span className="eyebrow-dot" />A calmer way to get things done</p>
          <h1>Make space for <em>momentum.</em></h1>
          <p className="hero-lede">Taskflow keeps your work clear, focused, and moving forward — without adding another complicated system to your day.</p>
          <div className="hero-actions">
            <Button onClick={onSignUp}>Start organizing <span aria-hidden="true">→</span></Button>
            <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note"><span className="note-check" aria-hidden="true">✓</span> A focused home for your daily work</p>
        </div>

        <div className="hero-visual" aria-label="Preview of a Taskflow board">
          <div className="visual-glow" aria-hidden="true" />
          <div className="workspace-window board-window">
            <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span className="window-title">Product launch</span><span className="window-menu">•••</span></div>
            <div className="board-toolbar"><strong>Launch plan</strong><span className="board-members"><i /> <i /> <i /></span></div>
            <div className="board-columns">
              <div className="board-column"><div className="column-title"><strong>To do</strong><span>•••</span></div><div className="board-card"><b className="card-label coral" /><strong>Write launch brief</strong><small>☷ 2&nbsp;&nbsp; ◷ Today</small></div><div className="board-card"><b className="card-label violet" /><strong>Outline campaign</strong><small>☷ 4&nbsp;&nbsp; ◷ Fri</small></div><div className="add-card">＋ Add a card</div></div>
              <div className="board-column"><div className="column-title"><strong>In progress</strong><span>•••</span></div><div className="board-card"><b className="card-label blue" /><strong>Design homepage</strong><small>☷ 3&nbsp;&nbsp; ◷ Today</small></div><div className="board-card"><b className="card-label yellow" /><strong>Review copy</strong><small>☷ 1&nbsp;&nbsp; ◷ Tomorrow</small></div><div className="add-card">＋ Add a card</div></div>
              <div className="board-column"><div className="column-title"><strong>Done</strong><span>•••</span></div><div className="board-card"><b className="card-label green" /><strong>Choose a launch date</strong><small>☷ 2&nbsp;&nbsp; ✓ Complete</small></div><div className="add-card">＋ Add a card</div></div>
            </div>
          </div>
          <div className="hero-card-stack" aria-label="Tasks move through the workflow">
            {heroTasks.map((task, index) => <article className={`hero-task-card hero-task-${index + 1}`} key={task.title}>
              <span className={`hero-task-label ${task.tone}`}>{task.label}</span>
              <strong>{task.title}</strong>
              <small>{task.meta}</small>
              <span className="hero-task-avatar">{index === 2 ? '✓' : index === 1 ? 'PS' : 'MC'}</span>
            </article>)}
          </div>
        </div>
      </section>

      <section className="principles" id="how-it-works">
        <div className="section-intro"><p className="eyebrow">BUILT FOR MOMENTUM</p><h2>Simple by design.<br /><em>Powerful in practice.</em></h2></div>
        <div className="feature-grid">{features.map((feature) => <article className="feature" key={feature.number}><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials-heading">
          <p className="eyebrow">LOVED BY BUSY TEAMS</p>
          <h2 id="testimonials-title">Less busywork.<br /><em>More momentum.</em></h2>
        </div>
        <div className="testimonial-marquee" aria-label="Customer testimonials">
          <div className="testimonial-track">
            <div className="testimonial-set">
              {testimonials.map((testimonial) => <TestimonialCard testimonial={testimonial} key={testimonial.name} />)}
            </div>
            <div className="testimonial-set" aria-hidden="true">
              {testimonials.map((testimonial) => <TestimonialCard testimonial={testimonial} key={`duplicate-${testimonial.name}`} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-labelledby="cta-title">
        <div className="cta-orb cta-orb-left" aria-hidden="true" />
        <div className="cta-orb cta-orb-right" aria-hidden="true" />
        <div className="cta-content">
          <p className="eyebrow">YOUR NEXT CLEAR STEP</p>
          <h2 id="cta-title">Make room for the<br /><em>work that matters.</em></h2>
          <p>Bring your tasks together and start each day with a little more clarity.</p>
          <Button onClick={onSignUp}>Try Taskflow free <span aria-hidden="true">→</span></Button>
          <small>No credit card required · Set up in minutes</small>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-main"><div><span className="brand"><span className="brand-mark" aria-hidden="true"><span /></span><span className='span'>taskflow</span></span><p>Less juggling. More doing.</p></div><div className="footer-links"><div><strong>Product</strong><a href="#how-it-works">How it works</a><a href="#top">Features</a></div><div><strong>Company</strong><a href="#testimonials-title">Our customers</a><a href="#cta-title">Get started</a></div><div><strong>Connect</strong><a href="mailto:hello@taskflow.app">Contact us</a><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></div></div></div>
        <div className="footer-bottom"><span>© 2024 Taskflow. Built for better days.</span><span>Made with intention.</span></div>
      </footer>
    </main>
  )
}
