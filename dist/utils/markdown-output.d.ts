import { Annotation, OutputDetailLevel } from '../types';
/**
 * Generate markdown output from annotations
 */
export declare function generateMarkdown(annotations: Annotation[], level?: OutputDetailLevel): string;
/**
 * Generate a compact single-line summary for an annotation
 */
export declare function generateAnnotationSummary(annotation: Annotation): string;
