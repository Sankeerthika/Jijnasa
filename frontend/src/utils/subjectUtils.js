/**
 * Common Subject Aliases and Acronyms
 */
const SUBJECT_ALIASES = {
  'oom': 'Object Oriented Modeling',
  'oops': 'Object Oriented Programming',
  'dbms': 'Database Management System',
  'ds': 'Data Structures',
  'daa': 'Design and Analysis of Algorithms',
  'os': 'Operating Systems',
  'cn': 'Computer Networks',
  'toc': 'Theory of Computation',
  'flat': 'Formal Languages and Automata Theory',
  'se': 'Software Engineering'
};

/**
 * Normalizes a subject name by converting it to a canonical form if possible.
 */
export const normalizeSubject = (name) => {
  if (!name) return '';
  const cleanName = name.trim().toLowerCase();
  
  // 1. Check direct alias match
  if (SUBJECT_ALIASES[cleanName]) {
    return SUBJECT_ALIASES[cleanName].toLowerCase();
  }
  
  return cleanName;
};

/**
 * Checks if two subject names match, even if one is an acronym or variation.
 */
export const isSubjectMatch = (subject1, subject2) => {
  const s1 = normalizeSubject(subject1);
  const s2 = normalizeSubject(subject2);
  
  if (!s1 || !s2) return false;
  
  // 1. Direct normalized match
  if (s1 === s2) return true;
  
  // 2. Partial inclusion
  if (s1.includes(s2) || s2.includes(s1)) return true;
  
  // 3. Acronym match (e.g., OOM matches Object Oriented Modeling)
  const getAcronym = (text) => {
    return text.split(/\s+/).map(word => word[0]).join('');
  };
  
  const acronym1 = getAcronym(s1);
  const acronym2 = getAcronym(s2);
  
  if (acronym1 === s2 || acronym2 === s1) return true;
  
  return false;
};
