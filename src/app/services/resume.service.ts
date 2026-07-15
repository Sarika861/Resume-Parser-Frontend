import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';





export interface ParsedResume {
    filename: string;
    personal_info?: {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
    summary?: string;
    skills?: string[];
    education?: any[];
    experience?: any[];
    projects?: any[];
    certifications?: any[];
    languages?: string[];
    total_experience_years?: number;
    parsed_at?: string;
}

export interface ResumeResponse {
    success: boolean;
    message: string;
    resume_id?: string;
    data?: ParsedResume;
}

export interface SearchRequest {
    query: string;
    filters?: any;
    limit?: number;
}

export interface SearchResult {
    resume_id: string;
    score: number;
    data: ParsedResume;
}

export interface SearchResponse {
    success: boolean;
    count: number;
    results: SearchResult[];
}

@Injectable({
    providedIn: 'root'
})
export class ResumeService {
    private apiUrl = "https://resume-parser-backend-tnp9.onrender.com";

    constructor(private http: HttpClient) { }

    uploadResume(file: File): Observable<ResumeResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<ResumeResponse>(`${this.apiUrl}/api/upload`, formData);
    }

    searchResumes(request: SearchRequest): Observable<SearchResponse> {
        return this.http.post<SearchResponse>(`${this.apiUrl}/api/search`, request);
    }

    getAllResumes(skip: number = 0, limit: number = 10): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/resumes?skip=${skip}&limit=${limit}`);
    }

    getResumeById(resumeId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/resume/${resumeId}`);
    }

    deleteResume(resumeId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/resume/${resumeId}`);
    }

    getInterviewQuestions(resumeId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/resume/${resumeId}/questions`);
    }
}
