import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  cards: any[] = [
    {id: 1, title: 'CUET', image: '/assets/images/cuet.jpg', desc: 'Get ready to pursue your dream postgraduate psychology course with our upcoming CUET coaching program. Designed for psychology graduates, this program offers expert-led classes, detailed study resources, and strategic test preparation to help you succeed in CUET-PG and gain admission to leading universities in India.'},

    {id: 2, title: 'Webinar', image: '/assets/images/webinar1.jpg', desc: 'Psychological Career Webinars are online sessions aimed at guiding individuals interested in psychology-related professions. These webinars feature experts discussing career paths such as clinical psychology, counseling, research, HR, forensic psychology, and more. They provide insights on required qualifications, skills, job prospects, and emerging fields, helping attendees make informed career decisions.'},

    {id: 3, title: 'Online Counseling', image: '/assets/images/counseling.jpg', desc: 'Online counseling is a form of psychological support delivered through digital platforms such as video calls, chats, or emails. It allows individuals to connect with licensed mental health professionals from any location. Online counseling is convenient, confidential, and effective for addressing issues like stress, anxiety, depression, and relationship problems.'}
  ]
}
