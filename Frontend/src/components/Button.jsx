export default function Button({ children, variant, className = '', ...props }) {
  return <button className={`button${variant ? ` ${variant}` : ''}${className ? ` ${className}` : ''}`} {...props}>{children}</button>
}
