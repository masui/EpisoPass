<h1><a href="http://EpisoPass.com">EpisoPass</a> -
    Generating passwords from unforgettable episodic memories</h1>

<img src="https://gyazo.com/e5e677f6c0175d82b11a6718a145ebd2.png">


While nobody can remember long strong passwords,
everybody has plenty of secret episodic memories
which he can never forget.
Then why not generating passwords from such
personal episodic memories?

<a href="http://EpisoPass.com">EpisoPass</a> lets you
generate <b>very strong</b> passwords based on your secret
episodic memories. 
If you do not forget your secret memories,
you have no chance losing your passwords generated from them!

<h2>Basic idea</h2>

Long passwords are hard to remember,
but old episodic memories are hard to forget.
If secret passwords can be generated from old
episodic memories, they are (1) hard to crack, and
(2) easy to be generated from memories.

<p></p>
Users of EpisoPass should provide question-answer
pairs based on their secret episodic memories.
In addition to the correct answer to a question,
users provide wrong answers for each question.
Passwords are calculated from the question-answer pairs,
and passwords generated from correct pairs are used
for various services.

<h2>Example</h2>

<img src="https://gyazo.com/eb49539fb30d689f739e5e24204b3bbd.png">

<a href="http://EpisoPass.com/Example/Facebook123">This</a>
is an example page of EpisoPass for generating a
Facebook password.
A seed string (&ldquo;<code>Facebook123</code>&rdquo;) and
two questions are provided by the user,
along with many answer candidates.
A password is generated based on the candidate selections.
If the correct answers are &ldquo;Palo Alto&rdquo; and &ldquo;Atami&rdquo;
and you select them on the page, you get &ldquo;Oegvcvzt489&rdquo;,
and you can use it as the password for your Facebook account.
This is a fairly strong cryptic password string,
and nobody can get this string as long as he does not
know the seed string and the correct answers to the question.

If you provide many Q-A pairs and a long seed string,
you can generate a long strong password based only on
the seed string and your episodic memories.
If your memories are not known to anybody else and
the number of Q-A pairs are large enough,
there's little chance for attackers to get your password
even when the seed string and the Q-A pairs are
open to the public.
Nevertheless, you can easily calculate it at
<a href="http://EpisoPass.com/Example/Facebook123">EpisoPass.com</a>
by just selecting correct answers for the questions.

Unlike conventional password management systems,
<b>users don't have to remember any secret keyword</b>
(e.g. a master keyword)
for managing their passwords.
All the passwords are calculated only by the users'
secret episodic memories, and all the information
for the calculation can be open to the public.

<h2>Install</h2>

<ul>
    <li><code>% git clone git@github.com:masui/EpisoPass.git</code>
    <li><code>% EpisoPass</code>
    <li><code>% bundle install</code>
    <li><code>% ruby episopass.rb</code>
</ul>
