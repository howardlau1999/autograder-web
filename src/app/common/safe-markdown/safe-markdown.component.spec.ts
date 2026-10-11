import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeMarkdownModule } from './safe-markdown.module';
import { SafeMarkdownComponent } from './safe-markdown.component';

describe('SafeMarkdownComponent', () => {
  let component: SafeMarkdownComponent;
  let fixture: ComponentFixture<SafeMarkdownComponent>;

  const render = (markdown: string, staffContent = false): HTMLElement => {
    component.staffContent = staffContent;
    component.data = markdown;
    component.ngOnChanges();
    return fixture.nativeElement.querySelector('.safe-markdown');
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SafeMarkdownModule] }).compileComponents();
    fixture = TestBed.createComponent(SafeMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders markdown', () => {
    const el = render('# Title\n\nSome *emphasis* and `code`.');
    expect(el.querySelector('h1')?.textContent).toBe('Title');
    expect(el.querySelector('em')?.textContent).toBe('emphasis');
    expect(el.querySelector('code')?.textContent).toBe('code');
  });

  it('drops scripts, event handlers and javascript: URLs', () => {
    const el = render(
      [
        '<script>window.pwned = 1</script>',
        '<img src="x" onerror="window.pwned = 1">',
        '[click](javascript:window.pwned=1)',
        '<a href="javascript:window.pwned=1">x</a>',
        '<iframe src="https://example.com"></iframe>',
      ].join('\n\n'),
    );
    expect(el.querySelector('script')).toBeNull();
    expect(el.querySelector('iframe')).toBeNull();
    expect(el.querySelector('img')?.getAttribute('onerror')).toBeNull();
    for (const a of Array.from(el.querySelectorAll('a'))) {
      expect(a.getAttribute('href') ?? '').not.toMatch(/^javascript:/i);
    }
    expect((window as unknown as { pwned?: number }).pwned).toBeUndefined();
  });

  it('keeps the HTML fence closed when content contains fences', () => {
    const el = render('```\n</code></pre><img src=x onerror="window.pwned=1">\n```');
    expect(el.querySelector('img[onerror]')).toBeNull();
    expect(el.querySelector('pre code')?.textContent).toContain('<img');
  });

  it('allows inline styles and task-list checkboxes only for staff content', () => {
    const markdown = '<p style="position: fixed">x</p>\n\n- [x] done\n- [ ] todo';
    const student = render(markdown, false);
    expect(student.querySelector('p')?.getAttribute('style')).toBeNull();
    expect(student.querySelector('input')).toBeNull();

    const staff = render(markdown, true);
    expect(staff.querySelector('p')?.getAttribute('style')).toBe('position: fixed');
    expect(staff.querySelectorAll('input[type="checkbox"]').length).toBe(2);
  });

  it('never renders form controls other than checkboxes', () => {
    const el = render(
      '<form action="https://evil.example"><input type="password"><button>Go</button></form>',
      true,
    );
    expect(el.querySelector('form')).toBeNull();
    expect(el.querySelector('button')).toBeNull();
    expect(el.querySelector('input[type="password"]')).toBeNull();
    expect(el.querySelector('input')).toBeNull();
  });

  it('keeps staff task-list checkboxes inert', () => {
    const el = render('- [x] done\n\n<input type="checkbox" onclick="window.pwned=1">', true);
    const inputs = Array.from(el.querySelectorAll('input'));
    expect(inputs.length).toBe(2);
    for (const input of inputs) {
      expect(input.getAttribute('type')).toBe('checkbox');
      expect(input.hasAttribute('disabled')).toBe(true);
      expect(input.getAttribute('onclick')).toBeNull();
    }
  });
});
