const languageIconMap: { [key: string]: string } = {
  JavaScript: 'javascript-plain',
  TypeScript: 'typescript-plain',
  Python: 'python-plain',
  Java: 'java-plain',
  'C++': 'cplusplus-plain',
  C: 'c-plain',
  'C#': 'csharp-plain',
  Ruby: 'ruby-plain',
  PHP: 'php-plain',
  Swift: 'swift-plain',
  Go: 'go-plain',
  Rust: 'rust-plain',
  Kotlin: 'kotlin-plain',
  Dart: 'dart-plain',
  HTML: 'html5-plain',
  CSS: 'css3-plain',
  Shell: 'bash-plain',
  Scala: 'scala-plain',
  Haskell: 'haskell-plain',
  Lua: 'lua-plain',
  Elixir: 'elixir-plain',
  Clojure: 'clojure-plain',
  Erlang: 'erlang-plain',
  R: 'r-plain',
  Julia: 'julia-plain',
  Perl: 'perl-plain',
  MATLAB: 'matlab-plain',
  Assembly: 'devicon-plain',
  Groovy: 'groovy-plain',
  'Objective-C': 'objectivec-plain',
  CoffeeScript: 'coffeescript-plain',
  Vim: 'vim-plain',
  Fortran: 'devicon-plain',
  Lisp: 'devicon-plain',
};

export function getLanguageIcon(language: string): string {
  const normalizedLanguage = language.toLowerCase();
  const icon = Object.keys(languageIconMap).find(
    (key) => key.toLowerCase() === normalizedLanguage
  );
  return icon ? languageIconMap[icon] : 'devicon-plain';
}